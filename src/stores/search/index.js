import {AsyncValueReducer} from '@stayradiated/mandarin'

import {FETCH_SEARCH_RESULTS} from '../constants'

const searchReducer = new AsyncValueReducer({
  defaultValue: {
    album: {items: []},
    artist: {items: []},
    playlist: {items: []},
    track: {items: []},
  },
  getValue: (action) => action.value.entities.hubs,
})

export default function (state = searchReducer.initialState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS.REQUEST:
      return searchReducer.handleRequest(state, action)

    case FETCH_SEARCH_RESULTS.FAILURE:
      return searchReducer.handleFailure(state, action)

    case FETCH_SEARCH_RESULTS.SUCCESS:
      return searchReducer.handleSuccess(state, action)

    default:
      return state
  }
}
