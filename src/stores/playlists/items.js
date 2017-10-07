import {TRACK, normalize} from 'perplexed'

import {FETCH_PLAYLIST_ITEMS, RESET_PLAYLIST_ITEMS} from '../constants'

import {createLibraryTypeChildrenStore} from '../../storeTemplates'

const store = createLibraryTypeChildrenStore({
  type: TRACK,
  actions: {
    fetch: FETCH_PLAYLIST_ITEMS,
    reset: RESET_PLAYLIST_ITEMS,
  },
  rootSelector: (state) => state.playlists.items,
  reducerOptions: {
    getValues: (action) => {
      const {id} = action.payload
      const playlist = action.value.entities.playlists[id]
      return playlist.items
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

export const reducer = store.reducer
export const fetchPlaylistItems = store.fetchTypeChildren
export const forceFetchPlaylistItems = store.forceFetchTypeChildren
export const resetPlaylistItems = store.resetTypeChildren
export const selectAllPlaylistItems = store.selectors
