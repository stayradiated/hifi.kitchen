import {normalizeType, ALBUM} from 'perplexed'
import {cacheMap} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_ARTIST_ALBUMS} from '../../constants'
import * as selectors from './selectors'

export function forceFetchArtistAlbums (artistId) {
  return {
    types: FETCH_ARTIST_ALBUMS,
    payload: {artistId},
    meta: {
      async: plex.artistAlbums(artistId, {includeRelated: 1})
        .then((res) => normalizeType(ALBUM, res)),
    },
  }
}

export const fetchArtistAlbums = cacheMap(
  forceFetchArtistAlbums,
  (artistId) => ({
    id: artistId,
    selectors,
  }),
)
