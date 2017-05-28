import {
  ALBUM,
  SORT_ALBUMS_BY_TITLE,
  SORT_ALBUMS_BY_ALBUM_ARTIST,
  SORT_ALBUMS_BY_YEAR,
  SORT_ALBUMS_BY_RELEASE_DATE,
  SORT_ALBUMS_BY_RATING,
  SORT_ALBUMS_BY_DATE_ADDED,
  SORT_ALBUMS_BY_DATE_PLAYED,
  SORT_ALBUMS_BY_VIEWS,
} from 'perplexed'

import {
  FETCH_LIBRARY_ALBUMS,
  SORT_LIBRARY_ALBUMS,
} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

const store = createLibraryTypeList({
  type: ALBUM,
  actions: {
    fetch: FETCH_LIBRARY_ALBUMS,
    sort: SORT_LIBRARY_ALBUMS,
  },
  sort: {
    default: 'Date Added',
    descending: true,
    options: {
      Title: SORT_ALBUMS_BY_TITLE,
      'Album Artist': SORT_ALBUMS_BY_ALBUM_ARTIST,
      Year: SORT_ALBUMS_BY_YEAR,
      'Release Date': SORT_ALBUMS_BY_RELEASE_DATE,
      Rating: SORT_ALBUMS_BY_RATING,
      'Date Added': SORT_ALBUMS_BY_DATE_ADDED,
      'Date Played': SORT_ALBUMS_BY_DATE_PLAYED,
      Views: SORT_ALBUMS_BY_VIEWS,
    },
  },
  rootSelector: (state) => state.library.albums,
  reducerOptions: {
    getValues: (action) => action.value.result.id.albums,
  },
})

export const reducer = store.reducer
export const fetchCurrentLibraryAlbumsRange = store.fetchCurrentLibraryTypeRange
export const fetchLibraryAlbumsRange = store.fetchLibraryTypeRange
export const sortLibraryAlbums = store.sortLibraryType
export const forceFetchLibraryAlbumsRange = store.forceFetchLibraryTypeRange
export const selectLibraryAlbums = store.selectors
