import {createSelector} from 'reselect'
import {normalize} from 'perplexed'
import {
  AsyncMapListReducer,
  cacheMapList,
  createListSelector,
} from '@stayradiated/mandarin'

import {selectPlex} from '../stores/plex/instance'

export default function createLibraryTypeList (options) {
  const {
    name,
    type: TYPE,
    actions: {
      fetch: FETCH_LIBRARY_TYPE,
      sort: SORT_LIBRARY_TYPE,
    },
    sort: {
      default: defaultSortBy,
      descending: defaultSortDesc,
      options: sortOptions,
    },
    rootSelector,
    reducerOptions = {},
    fetchItems = ({library}, section, params) =>
      normalize(library.sectionItems(section, TYPE, params)),
  } = options

  const selectors = createListSelector(rootSelector)

  selectors.currentIds = createSelector(
    selectPlex.librarySectionId,
    selectors.values,
    (section, values) => values.get(section) || [])

  selectors.sortKey = createSelector(rootSelector, (root) => {
    console.log(root.sortOptions, root.sortBy, root.sortDesc)
    return root.sortOptions[root.sortBy][root.sortDesc ? 1 : 0]
  })

  selectors.sortBy = createSelector(rootSelector, (root) =>
    root.sortBy)

  selectors.sortDesc = createSelector(rootSelector, (root) =>
    root.sortDesc)

  selectors.sortOptions = createSelector(rootSelector, (root) =>
    Object.keys(root.sortOptions))

  const forceFetchLibraryTypeRange = (section, start, end) =>
    (dispatch, getState) => {
      const sort = selectors.sortKey(getState())
      const params = {start, size: end - start, sort}

      return dispatch({
        types: FETCH_LIBRARY_TYPE,
        payload: {section, start, end},
        meta: {
          plex: (plex) => fetchItems(plex, section, params),
        },
      })
    }

  const fetchLibraryTypeRange = cacheMapList(
    (section, start, end) => ({
      id: section,
      range: [start, end],
      selectors,
      dispatch: (range) => forceFetchLibraryTypeRange(
        section, range[0], range[1]),
    }),
  )

  const fetchCurrentLibraryTypeRange = (start, end) => {
    return (dispatch, getState) => {
      const state = getState()
      const section = selectPlex.librarySectionId(state)
      return dispatch(fetchLibraryTypeRange(section, start, end))
    }
  }

  const sortLibraryType = (sortBy, sortDesc) => ({
    type: SORT_LIBRARY_TYPE,
    payload: {sortBy, sortDesc},
  })

  const asyncReducer = new AsyncMapListReducer({
    getId: (action) => action.payload.section,
    getTotal: (action) => action.value.result.id.totalSize,
    ...reducerOptions,
  })

  const initialState = {
    ...asyncReducer.initialState,
    sortBy: defaultSortBy,
    sortDesc: defaultSortDesc,
    sortOptions,
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_LIBRARY_TYPE.REQUEST:
        return asyncReducer.handleRequest(state, action)

      case FETCH_LIBRARY_TYPE.FAILURE:
        return asyncReducer.handleFailure(state, action)

      case FETCH_LIBRARY_TYPE.SUCCESS:
        return asyncReducer.handleSuccess(state, action)

      case SORT_LIBRARY_TYPE:
        const {sortBy, sortDesc} = action.payload
        return {
          ...initialState,
          sortBy,
          sortDesc,
        }

      default:
        return state
    }
  }

  return {
    reducer,
    [`fetchCurrentLibrary${name}Range`]: fetchCurrentLibraryTypeRange,
    [`fetchLibrary${name}Range`]: fetchLibraryTypeRange,
    [`sortLibrary${name}`]: sortLibraryType,
    [`forceFetchLibrary${name}Range`]:forceFetchLibraryTypeRange,
    [`selectLibrary${name}`]: selectors,
  }
}
