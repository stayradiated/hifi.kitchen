import {TRACK} from 'perplexed'
import {c} from '@stayradiated/mandarin'

import plex from '../../plex'
import {createLibraryTypeStore} from '../../storeTemplates'

import {
  CREATE_QUEUE,
  FETCH_PLAYLIST_TRACKS,
  FETCH_ALBUM_TRACKS,
  SEARCH,
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

module.exports.rateTrack = (track, rating) => ({
  types: RATE_TRACK,
  payload: {trackId: track.id, rating},
  meta: {
    async: plex.rate(track.id, rating),
  },
})
