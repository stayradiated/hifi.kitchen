import {ALBUM} from 'perplexed'

import {FETCH_ARTIST_ALBUMS} from '../constants'

import {createLibraryTypeChildrenStore} from '../../storeTemplates'

const store = createLibraryTypeChildrenStore({
  type: ALBUM,
  constant: FETCH_ARTIST_ALBUMS,
  rootSelector: (state) => state.artists.albums,
  reducerOptions: {
    getValues: (action) => action.value.result.id.albums,
  },
})

export const reducer = store.reducer
export const fetchArtistAlbums = store.fetchTypeChildren
export const forceFetchArtistAlbums = store.forceFetchTypeChildren
export const selectAllArtistAlbums = store.selectors
