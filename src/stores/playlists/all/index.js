import {actionTypes} from 'redux-localstorage'
import {
  AsyncMapReducer,
  createObjectMergeFunction,
} from '@stayradiated/mandarin'

import {rehydrateMapReducer} from '../../../utils'
import {SEARCH, FETCH_PLAYLIST, FETCH_LIBRARY_PLAYLISTS} from '../../constants'

// Plex returns a new composite URL in every response, which causes the
// playlist image to suddenly change when the user opens a playist.
const preserveCompositeUrl = (newPlaylist, oldPlaylist) => {
  const {composite} = oldPlaylist != null ? oldPlaylist : newPlaylist
  return {
    ...newPlaylist,
    composite,
  }
}

const reducer = new AsyncMapReducer({
  getId: (action) => action.payload.playlistId,
  getValue: (action) => {
    const {playlistId} = action.payload
    const {entities} = action.value
    return entities.playlists[playlistId]
  },
  updateValue: preserveCompositeUrl,
})

const mergePlaylists = createObjectMergeFunction({
  getId: (playlist) => playlist.id,
  updateFn: preserveCompositeUrl,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return rehydrateMapReducer(state, action.payload, ['playlists', 'all'])

    case FETCH_PLAYLIST.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_PLAYLIST.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_PLAYLIST.SUCCESS:
      return reducer.handleSuccess(state, action)

    case FETCH_LIBRARY_PLAYLISTS.SUCCESS:
      return {
        ...state,
        values: mergePlaylists(state.values, action.value.entities.playlists),
      }

    case SEARCH.SUCCESS:
      return {
        ...state,
        values: mergePlaylists(state.values, action.value.entities.playlists),
      }

    default:
      return state
  }
}
