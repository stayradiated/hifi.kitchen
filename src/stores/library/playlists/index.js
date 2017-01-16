import {AsyncListReducer} from '@stayradiated/mandarin'

import {FETCH_LIBRARY_PLAYLISTS} from '../../constants'

const reducer = new AsyncListReducer({
  getValues: (action) => action.value.result.id.playlists,
  getTotal: (action) => action.value.result.id.totalSize,
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
