import {createSelector} from 'reselect'
import {normalize, SORT_ALBUMS_BY_DATE_ADDED_DESC} from 'perplexed'
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
    constant: FETCH_LIBRARY_TYPE,
    rootSelector,
    reducerOptions = {},
    fetchItems = ({library}, section, start, end) =>
      normalize(library.sectionItems(
        section,
        TYPE,
        {
          start,
          size: end - start,
          sort: SORT_ALBUMS_BY_DATE_ADDED_DESC,
        })),
  } = options

  const selectors = createListSelector(rootSelector)

  selectors.currentIds = createSelector(
    selectPlex.librarySectionId,
    selectors.values,
    (section, values) => values.get(section) || [])

  const forceFetchLibraryTypeRange = (section, start, end) => ({
    types: FETCH_LIBRARY_TYPE,
    payload: {section, start, end},
    meta: {
      plex: (plex) => fetchItems(plex, section, start, end),
    },
  })

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

  const asyncReducer = new AsyncMapListReducer({
    getId: (action) => action.payload.section,
    getTotal: (action) => action.value.result.id.totalSize,
    ...reducerOptions,
  })

  const reducer = (state = asyncReducer.initialState, action) => {
    switch (action.type) {
      case FETCH_LIBRARY_TYPE.REQUEST:
        return asyncReducer.handleRequest(state, action)

      case FETCH_LIBRARY_TYPE.FAILURE:
        return asyncReducer.handleFailure(state, action)

      case FETCH_LIBRARY_TYPE.SUCCESS:
        return asyncReducer.handleSuccess(state, action)

      default:
        return state
    }
  }

  return {
    reducer,
    [`fetchCurrentLibrary${name}Range`]: fetchCurrentLibraryTypeRange,
    [`fetchLibrary${name}Range`]: fetchLibraryTypeRange,
    [`forceFetchLibrary${name}Range`]:forceFetchLibraryTypeRange,
    [`selectLibrary${name}`]: selectors,
  }
}
