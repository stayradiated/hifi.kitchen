import {ALBUM} from 'perplexed'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  FETCH_SEARCH_RESULTS,
  FETCH_LIBRARY_ALBUMS,
  FETCH_ARTIST_ALBUMS,
  FETCH_ALBUM,
} from '../constants'

const store = createLibraryTypeStore({
  constant: FETCH_ALBUM,
  libraryType: ALBUM,
  entity: 'albums',
  rootSelector: (state) => state.albums.all,
  mergeActions: [
    FETCH_SEARCH_RESULTS.SUCCESS,
    FETCH_LIBRARY_ALBUMS.SUCCESS,
    FETCH_ARTIST_ALBUMS.SUCCESS,
  ],
})

export const reducer = store.reducer
export const forceFetchAlbum = store.forceFetchType
export const fetchAlbum = store.fetchType
export const selectAllAlbums = store.selectors
