import {TRACK} from 'perplexed'

import {FETCH_ALBUM_TRACKS} from '../constants'

import {createLibraryTypeChildrenStore} from '../../storeTemplates'

const store = createLibraryTypeChildrenStore({
  type: TRACK,
  constant: FETCH_ALBUM_TRACKS,
  rootSelector: (state) => state.albums.tracks,
  reducerOptions: {
    getValues: (action) => action.value.result.id.tracks,
  },
})

export const reducer = store.reducer
export const fetchAlbumTracks = store.fetchTypeChildren
export const forceFetchAlbumTracks = store.forceFetchTypeChildren
export const selectAllAlbumTracks = store.selectors
