import {cacheMap} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_PLAYLIST_TRACKS} from '../../constants'
import * as selectors from './selectors'

export function forceFetchPlaylistTracks (playlistId) {
  return {
    types: FETCH_PLAYLIST_TRACKS,
    payload: {playlistId},
    meta: {
      async: plex.normalizedPlaylistTracks(playlistId),
    },
  }
}

export const fetchPlaylistTracks = cacheMap(
  forceFetchPlaylistTracks,
  (playlistId) => ({
    id: playlistId,
    selectors,
  }),
)
