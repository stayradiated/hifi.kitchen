import {TRACK} from 'perplexed'
import {c} from '@stayradiated/mandarin'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  CREATE_QUEUE,
  FETCH_ALBUM_TRACKS,
  FETCH_PLAYLIST_TRACKS,
  FETCH_QUEUE,
  FETCH_SEARCH_RESULTS,
  FETCH_TRACK,
  SHUFFLE_PLAY_QUEUE,
  UNSHUFFLE_PLAY_QUEUE,
  FETCH_LIBRARY_TRACKS,
} from '../constants'

const RATE_TRACK = c('RATE_TRACK')

const store = createLibraryTypeStore({
  constant: FETCH_TRACK,
  libraryType: TRACK,
  entity: 'tracks',
  rootSelector: (state) => state.tracks.all,
  mergeActions: [
    CREATE_QUEUE.SUCCESS,
    FETCH_ALBUM_TRACKS.SUCCESS,
    FETCH_PLAYLIST_TRACKS.SUCCESS,
    FETCH_QUEUE.SUCCESS,
    FETCH_SEARCH_RESULTS.SUCCESS,
    SHUFFLE_PLAY_QUEUE.SUCCESS,
    UNSHUFFLE_PLAY_QUEUE.SUCCESS,
    FETCH_LIBRARY_TRACKS.SUCCESS,
  ],
  customActions: {
    [RATE_TRACK.REQUEST]: (state, action) => {
      const {trackId, rating} = action.payload
      const valueMap = new Map(state.values)
      valueMap.set(trackId, {
        ...valueMap.get(trackId),
        userRating: rating,
      })
      return {
        ...state,
        values: valueMap,
      }
    },
  },
})

export const rateTrack = (trackId, rating) => ({
  types: RATE_TRACK,
  payload: {trackId, rating},
  meta: {
    plex: ({library}) => library.rate(trackId, rating),
  },
})

export const reducer = store.reducer
export const forceFetchTrack = store.forceFetchType
export const fetchTrack = store.fetchType
export const selectAllTracks = store.selectors
