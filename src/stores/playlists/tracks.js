import {TRACK, normalize} from 'perplexed'

import {FETCH_PLAYLIST_TRACKS} from '../constants'

import {createLibraryTypeChildrenStore} from '../../storeTemplates'

module.exports = createLibraryTypeChildrenStore({
  name: 'PlaylistTracks',
  type: TRACK,
  constant: FETCH_PLAYLIST_TRACKS,
  rootSelector: (state) => state.playlists.tracks,
  reducerOptions: {
    getValues: (action) => {
      const {id} = action.payload
      const playlist = action.value.entities.playlists[id]
      return playlist.tracks
    },
    getTotal: (action) => {
      const {id} = action.payload
      const playlist = action.value.entities.playlists[id]
      return playlist.leafCount
    },
  },
  fetchItems: ({library}, playlistId, start, end) =>
    normalize(library.playlistTracks(
      playlistId, {start, size: end - start})),
})
