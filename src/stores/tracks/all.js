import {TRACK} from 'perplexed'
import {c} from '@stayradiated/mandarin'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  FETCH_QUEUE,
  CREATE_QUEUE,
  FETCH_ALBUM_TRACKS,
  FETCH_PLAYLIST_TRACKS,
  SEARCH,
} from '../constants'

const RATE_TRACK = c('RATE_TRACK')

module.exports = createLibraryTypeStore({
  type: TRACK,
  name: 'Track',
  entity: 'tracks',
  rootSelector: (state) => state.tracks.all,
  mergeActions: [
    FETCH_QUEUE.SUCCESS,
    CREATE_QUEUE.SUCCESS,
    FETCH_ALBUM_TRACKS.SUCCESS,
    FETCH_PLAYLIST_TRACKS.SUCCESS,
    SEARCH.SUCCESS,
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
