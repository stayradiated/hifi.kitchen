import {
  normalize,
  PLAYLIST,
  PLAYLIST_TYPE_MUSIC,
  SORT_PLAYLISTS_BY_NAME,
} from 'perplexed'

import {
  FETCH_LIBRARY_PLAYLISTS_REGULAR,
  SORT_LIBRARY_PLAYLISTS_REGULAR,
} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

const store = createLibraryTypeList({
  type: PLAYLIST,
  actions: {
    fetch: FETCH_LIBRARY_PLAYLISTS_REGULAR,
    sort: SORT_LIBRARY_PLAYLISTS_REGULAR,
  },
  sort: {
    default: 'Name',
    descending: false,
    options: {
      Name: SORT_PLAYLISTS_BY_NAME,
    },
  },
  rootSelector: (state) => state.library.playlistsRegular,
  reducerOptions: {
    getValues: (action) => action.value.result.id.playlists,
    getTotal: (action) => action.value.result.id.totalSize,
  },
  fetchItems: ({library}, section, options) =>
    normalize(library.playlists({
      ...options,
      smart: 0,
      playlistType: PLAYLIST_TYPE_MUSIC,
    })),
})

export const reducer = store.reducer
export const fetchCurrentLibraryPlaylistsRegularRange = store.fetchCurrentLibraryTypeRange
export const fetchLibraryPlaylistsRegularRange = store.fetchLibraryTypeRange
export const sortLibraryPlaylistsRegular = store.sortLibraryType
export const forceFetchLibraryPlaylistsRegularRange = store.forceFetchLibraryTypeRange
export const selectLibraryPlaylistsRegular = store.selectors
