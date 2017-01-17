import {normalize} from 'perplexed'
import {cacheMap} from '@stayradiated/mandarin'

import {FETCH_PLAYLIST_TRACKS} from '../../constants'
import * as selectors from './selectors'

export function forceFetchPlaylistTracks (playlistId) {
  return {
    types: FETCH_PLAYLIST_TRACKS,
    payload: {playlistId},
    meta: {
      plex: ({library}) => normalize(library.playlistTracks(playlistId, {size: 50})),
    },
  }
}

export const fetchPlaylistTracks = cacheMap((playlistId) => ({
  id: playlistId,
  selectors,
  dispatch: forceFetchPlaylistTracks,
}))
