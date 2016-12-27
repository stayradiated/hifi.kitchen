import {
  c, cacheValue, AsyncValueReducer, createValueSelector,
} from '@stayradiated/mandarin'

import plex from '../plex'

export const FETCH_LIBRARY_SECTIONS = c`FETCH_LIBRARY_SECTIONS`

export const selectors = createValueSelector((state) => state.librarySections)

export const forceFetchLibrarySections = () => ({
  types: FETCH_LIBRARY_SECTIONS,
  meta: {
    async: plex.sections(),
  },
})

export const fetchLibrarySections = cacheValue(
  forceFetchLibrarySections,
  () => ({selectors}),
)

const reducer = new AsyncValueReducer({
  defaultValue: [],
  getValue: (action) => action.value.items,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case FETCH_LIBRARY_SECTIONS.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_LIBRARY_SECTIONS.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_LIBRARY_SECTIONS.SUCCESS:
      return reducer.handleSuccess(state, action)

    default:
      return state
  }
}
