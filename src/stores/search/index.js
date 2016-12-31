import {AsyncValueReducer} from '@stayradiated/mandarin'

import {SEARCH} from '../constants'

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
    case SEARCH.REQUEST:
      return searchReducer.handleRequest(state, action)

    case SEARCH.FAILURE:
      return searchReducer.handleFailure(state, action)

    case SEARCH.SUCCESS:
      return searchReducer.handleSuccess(state, action)

    default:
      return state
  }
}
