import {TRACK} from 'perplexed'
import {c} from '@stayradiated/mandarin'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  CREATE_QUEUE,
  FETCH_ALBUM_TRACKS,
  FETCH_PLAYLIST_TRACKS,
  FETCH_QUEUE,
  SEARCH,
  SHUFFLE_PLAY_QUEUE,
  UNSHUFFLE_PLAY_QUEUE,
} from '../constants'

const RATE_TRACK = c('RATE_TRACK')

module.exports = createLibraryTypeStore({
  type: TRACK,
  name: 'Track',
  entity: 'tracks',
  rootSelector: (state) => state.tracks.all,
  mergeActions: [
    CREATE_QUEUE.SUCCESS,
    FETCH_ALBUM_TRACKS.SUCCESS,
    FETCH_PLAYLIST_TRACKS.SUCCESS,
    FETCH_QUEUE.SUCCESS,
    SEARCH.SUCCESS,
    SHUFFLE_PLAY_QUEUE.SUCCESS,
    UNSHUFFLE_PLAY_QUEUE.SUCCESS,
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

module.exports.rateTrack = (trackId, rating) => ({
  types: RATE_TRACK,
  payload: {trackId, rating},
  meta: {
    plex: ({library}) => library.rate(trackId, rating),
  },
})
