import {actionTypes} from 'redux-localstorage'
import {AsyncMapReducer} from '@stayradiated/mandarin'

import {rehydrateMapReducer} from '../../../utils'
import {FETCH_PLAYLIST_TRACKS} from '../../constants'

const fetchPlaylistTracksReducer = new AsyncMapReducer({
  defaultMap: [],
  getId: (action) => action.payload.playlistId,
  getValue: (action) => action.value.entities.playlists[action.payload.playlistId].items,
  updateMap: (newMap) => (oldMap) => {
    return oldMap.concat(newMap)
  },
})

export default function (state = fetchPlaylistTracksReducer.initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return rehydrateMapReducer(state, action.payload, ['playlists', 'tracks'])

    case FETCH_PLAYLIST_TRACKS.REQUEST:
      return fetchPlaylistTracksReducer.handleRequest(state, action)

    case FETCH_PLAYLIST_TRACKS.FAILURE:
      return fetchPlaylistTracksReducer.handleFailure(state, action)

    case FETCH_PLAYLIST_TRACKS.SUCCESS:
      return fetchPlaylistTracksReducer.handleSuccess(state, action)

    default:
      return state
  }
}
