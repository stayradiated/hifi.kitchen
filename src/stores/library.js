import {
  c, AsyncValueReducer, createValueSelector,
} from '@stayradiated/mandarin'

import plex from '../plex'

export const FETCH_LIBRARY_ALBUMS = c`FETCH_LIBRARY_ALBUMS`

export const selectors = createValueSelector((state) => state.library)

export function fetchLibraryAlbums (size) {
  return (dispatch, getState) => {
    const start = selectors.value(getState()).length

    return dispatch({
      types: FETCH_LIBRARY_ALBUMS,
      payload: {start, size},
      meta: {
        async: plex.albums(start, size),
      },
    })
  }
}

const reducer = new AsyncValueReducer({
  defaultValue: [],
  getValue: (action) => action.value.result.metadata,
  updateValue: (newValue, oldValue) => {
    return oldValue.concat(newValue)
  },
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case FETCH_LIBRARY_ALBUMS.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_LIBRARY_ALBUMS.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_LIBRARY_ALBUMS.SUCCESS:
      return reducer.handleSuccess(state, action)

    default:
      return state
  }
}
