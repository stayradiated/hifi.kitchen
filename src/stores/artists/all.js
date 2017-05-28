import {ARTIST} from 'perplexed'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  SEARCH,
  FETCH_LIBRARY_ARTISTS,
  FETCH_ARTIST,
} from '../constants'

const store = createLibraryTypeStore({
  constant: FETCH_ARTIST,
  libraryType: ARTIST,
  entity: 'artists',
  rootSelector: (state) => state.artists.all,
  mergeActions: [
    SEARCH.SUCCESS,
    FETCH_LIBRARY_ARTISTS.SUCCESS,
  ],
})

export const reducer = store.reducer
export const forceFetchArtist = store.forceFetchType
export const fetchArtist = store.fetchType
export const selectAllArtists = store.selectors
