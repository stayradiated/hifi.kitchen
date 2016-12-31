import {normalizeType, ARTIST} from 'perplexed'
import {cacheMap} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_ARTIST} from '../../constants'
import * as selectors from './selectors'

export const forceFetchArtist = (artistId) => ({
  types: FETCH_ARTIST,
  payload: {artistId},
  meta: {
    async: plex.artist(artistId)
      .then((res) => normalizeType(ARTIST, res)),
  },
})

export const fetchArtist = cacheMap(forceFetchArtist, (artistId) => ({
  id: artistId,
  selectors,
}))
