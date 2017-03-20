import {PLAYLIST, normalize} from 'perplexed'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  SEARCH,
  FETCH_LIBRARY_PLAYLISTS,
} from '../constants'

module.exports = createLibraryTypeStore({
  type: PLAYLIST,
  name: 'Playlist',
  entity: 'playlists',
  rootSelector: (state) => state.playlists.all,
  mergeActions: [
    SEARCH.SUCCESS,
    FETCH_LIBRARY_PLAYLISTS.SUCCESS,
  ],
  fetchItems: ({library}, playlistId) =>
    normalize(library.playlist(playlistId)),
})
