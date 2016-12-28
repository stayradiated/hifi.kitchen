import plex from '../../../plex'
import {RATE_TRACK} from '../../constants'

export const rateTrack = (track, rating) => ({
  types: RATE_TRACK,
  payload: {trackId: track.id, rating},
  meta: {
    async: plex.rate(track.id, rating),
  },
})
