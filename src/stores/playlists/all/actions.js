import {cacheMap} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_PLAYLIST} from '../../constants'
import * as selectors from './selectors'

export const forceFetchPlaylist = (playlistId) => ({
  types: FETCH_PLAYLIST,
  payload: {playlistId},
  meta: {
    async: plex.normalizedPlaylist(playlistId),
  },
})

export const fetchPlaylist = cacheMap(forceFetchPlaylist, (playlistId) => ({
  id: playlistId,
  selectors,
}))
