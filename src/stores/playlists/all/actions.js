import {normalize} from 'perplexed'
import {cacheMap} from '@stayradiated/mandarin'

import {FETCH_PLAYLIST} from '../../constants'
import * as selectors from './selectors'

export const forceFetchPlaylist = (playlistId) => ({
  types: FETCH_PLAYLIST,
  payload: {playlistId},
  meta: {
    plex: ({library}) => library.playlist(playlistId)
    .then((res) => {
      console.log(res)
      return normalize(res)
    })
  },
})

export const fetchPlaylist = cacheMap((playlistId) => ({
  id: playlistId,
  selectors,
  dispatch: forceFetchPlaylist,
}))
