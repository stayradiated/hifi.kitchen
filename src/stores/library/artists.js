import {
  ARTIST,
  SORT_ARTISTS_BY_TITLE,
  SORT_ARTISTS_BY_DATE_ADDED,
  SORT_ARTISTS_BY_DATE_PLAYED,
  SORT_ARTISTS_BY_PLAYS,
} from 'perplexed'

import {
  FETCH_LIBRARY_ARTISTS,
  SORT_LIBRARY_ARTISTS,
  RESET_LIBRARY_ARTISTS,
} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

const store = createLibraryTypeList({
  type: ARTIST,
  actions: {
    fetch: FETCH_LIBRARY_ARTISTS,
    sort: SORT_LIBRARY_ARTISTS,
    reset: RESET_LIBRARY_ARTISTS,
  },
  sort: {
    default: 'Date Added',
    descending: true,
    options: {
      Title: SORT_ARTISTS_BY_TITLE,
      'Date Added': SORT_ARTISTS_BY_DATE_ADDED,
      'Date Played': SORT_ARTISTS_BY_DATE_PLAYED,
      Plays: SORT_ARTISTS_BY_PLAYS,
    },
  },
  rootSelector: (state) => state.library.artists,
  reducerOptions: {
    getValues: (action) => action.value.result.id.artists,
  },
})

export const reducer = store.reducer
export const fetchCurrentLibraryArtistsRange = store.fetchCurrentLibraryTypeRange
export const fetchLibraryArtistsRange = store.fetchLibraryTypeRange
export const forceFetchLibraryArtistsRange = store.forceFetchLibraryTypeRange
export const resetCurrentLibraryArtists = store.resetCurrentLibraryType
export const selectLibraryArtists = store.selectors
export const sortLibraryArtists = store.sortLibraryType
