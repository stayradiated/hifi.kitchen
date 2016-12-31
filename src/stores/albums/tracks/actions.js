import {normalizeType, TRACK} from 'perplexed'
import {cacheMap} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_ALBUM_TRACKS} from '../../constants'
import * as selectors from './selectors'

export function forceFetchAlbumTracks (albumId) {
  return {
    types: FETCH_ALBUM_TRACKS,
    payload: {albumId},
    meta: {
      async: plex.albumTracks(albumId, {includeRelated: 1})
        .then((res) => normalizeType(TRACK, res)),
    },
  }
}

export const fetchAlbumTracks = cacheMap(
  forceFetchAlbumTracks,
  (albumId) => ({
    id: albumId,
    selectors,
  }),
)
