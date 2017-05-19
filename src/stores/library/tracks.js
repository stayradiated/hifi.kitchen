import {
  TRACK,
  SORT_TRACKS_BY_TITLE,
  SORT_TRACKS_BY_ALBUM_ARTIST,
  SORT_TRACKS_BY_ARTIST,
  SORT_TRACKS_BY_ALBUM,
  SORT_TRACKS_BY_YEAR,
  SORT_TRACKS_BY_RATING,
  SORT_TRACKS_BY_DURATION,
  SORT_TRACKS_BY_PLAYS,
  SORT_TRACKS_BY_DATE_ADDED,
  SORT_TRACKS_BY_BITRATE,
  SORT_TRACKS_BY_POPULARITY,
} from 'perplexed'

import {
  FETCH_LIBRARY_TRACKS,
  SORT_LIBRARY_TRACKS,
} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  name: 'Tracks',
  type: TRACK,
  actions: {
    fetch: FETCH_LIBRARY_TRACKS,
    sort: SORT_LIBRARY_TRACKS,
  },
  sort: {
    default: 'Date Added',
    descending: true,
    options: {
      Title: SORT_TRACKS_BY_TITLE,
      'Album Artist': SORT_TRACKS_BY_ALBUM_ARTIST,
      Artist: SORT_TRACKS_BY_ARTIST,
      Album: SORT_TRACKS_BY_ALBUM,
      Year: SORT_TRACKS_BY_YEAR,
      Rating: SORT_TRACKS_BY_RATING,
      Duration: SORT_TRACKS_BY_DURATION,
      Plays: SORT_TRACKS_BY_PLAYS,
      'Date Added': SORT_TRACKS_BY_DATE_ADDED,
      Bitrate: SORT_TRACKS_BY_BITRATE,
      Popularity: SORT_TRACKS_BY_POPULARITY,
    },
  },
  rootSelector: (state) => state.library.tracks,
  reducerOptions: {
    getValues: (action) => action.value.result.id.tracks,
  },
})
