import {AsyncListReducer} from '@stayradiated/mandarin'

import {FETCH_LIBRARY_PLAYLISTS} from '../../constants'

// TODO: update plex api to return a proper playlist container...
const reducer = new AsyncListReducer({
  getValues: (action) => action.value.result,
  getTotal: (action) => action.value.result.length,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case FETCH_LIBRARY_PLAYLISTS.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_LIBRARY_PLAYLISTS.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_LIBRARY_PLAYLISTS.SUCCESS:
      return reducer.handleSuccess(state, action)

    default:
      return state
  }
}
