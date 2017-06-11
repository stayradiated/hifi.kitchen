import {PLAYLIST, normalize} from 'perplexed'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  FETCH_SEARCH_RESULTS,
  FETCH_LIBRARY_PLAYLISTS,
  FETCH_LIBRARY_PLAYLISTS_REGULAR,
  FETCH_PLAYLIST,
} from '../constants'

const store = createLibraryTypeStore({
  constant: FETCH_PLAYLIST,
  libraryType: PLAYLIST,
  entity: 'playlists',
  rootSelector: (state) => state.playlists.all,
  mergeActions: [
    FETCH_SEARCH_RESULTS.SUCCESS,
    FETCH_LIBRARY_PLAYLISTS.SUCCESS,
    FETCH_LIBRARY_PLAYLISTS_REGULAR.SUCCESS,
  ],
  fetchItems: ({library}, playlistId) =>
    normalize(library.playlist(playlistId)),
})

export const reducer = store.reducer
export const forceFetchPlaylist = store.forceFetchType
export const fetchPlaylist = store.fetchType
export const selectAllPlaylists = store.selectors
