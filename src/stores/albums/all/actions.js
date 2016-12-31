import {normalizeType, ALBUM} from 'perplexed'
import {cacheMap} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_ALBUM} from '../../constants'
import * as selectors from './selectors'

export const forceFetchAlbum = (albumId) => ({
  types: FETCH_ALBUM,
  payload: {albumId},
  meta: {
    async: plex.album(albumId)
      .then((res) => normalizeType(ALBUM, res)),
  },
})

export const fetchAlbum = cacheMap(forceFetchAlbum, (albumId) => ({
  id: albumId,
  selectors,
}))
