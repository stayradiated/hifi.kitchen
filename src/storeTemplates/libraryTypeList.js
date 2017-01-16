import {normalize} from 'perplexed'
import {
  AsyncMapListReducer,
  cacheMapList,
  createListSelector,
} from '@stayradiated/mandarin'

export default function createLibraryTypeList (options) {
  const {
    name,
    type: TYPE,
    constant: FETCH_LIBRARY_TYPE,
    rootSelector,
    reducerOptions = {},
  } = options

  const selectors = createListSelector(rootSelector)

  const forceFetchLibraryTypeRange = (section, start, end) => ({
    types: FETCH_LIBRARY_TYPE,
    payload: {section, start, end},
    meta: {
      plex: ({library}) => normalize(library.sectionItems(
        section, TYPE, {start, size: end - start})),
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
    [`fetchLibrary${name}Range`]: fetchLibraryTypeRange,
    [`forceFetchLibrary${name}Range`]:forceFetchLibraryTypeRange,
    [`selectLibrary${name}`]: selectors,
  }
}
