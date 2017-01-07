import {c, AsyncMapListReducer, cacheMapList, createListSelector} from '@stayradiated/mandarin'
import {normalizeType} from 'perplexed'

import plex from '../plex'

export default function createLibraryTypeList (options) {
  const {type: TYPE, name, rootSelector} = options

  const FETCH_LIBRARY_TYPE = c(`FETCH_LIBRARY_${name.toUpperCase()}`)

  const selectors = createListSelector(rootSelector)

  const forceFetchLibraryTypeRange = (section, start, end) => ({
    types: FETCH_LIBRARY_TYPE,
    payload: {section, start, end},
    meta: {
      async: plex.sectionItems(section, TYPE, {start, size: end - start})
        .then((res) => normalizeType(TYPE, res)),
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
    getValues: (action) => action.value.result.items,
    getTotal: (action) => action.value.result.totalSize,
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
    [`FETCH_LIBRARY_${name.toUpperCase()}`]: FETCH_LIBRARY_TYPE,
    [`fetchLibrary${name}Range`]: fetchLibraryTypeRange,
    [`forceFetchLibrary${name}Range`]:forceFetchLibraryTypeRange,
    [`selectLibrary${name}`]: selectors,
  }
}
