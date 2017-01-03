import {cacheList} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_LIBRARY_PLAYLISTS} from '../../constants'
import * as selectors from './selectors'

export const forceFetchLibraryPlaylistsRange = (start, end) => ({
  types: FETCH_LIBRARY_PLAYLISTS,
  payload: {start, end},
  meta: {
    async: plex.normalizedPlaylists({start, size: end - start}),
  },
})

export const fetchLibraryPlaylistsRange = cacheList(
  forceFetchLibraryPlaylistsRange,
  (start, end) => ({
    range: [start, end],
    selectors,
  }),
)
