import {normalize} from 'perplexed'
import {cacheList} from '@stayradiated/mandarin'

import {FETCH_LIBRARY_PLAYLISTS} from '../../constants'
import * as selectors from './selectors'

export const forceFetchLibraryPlaylistsRange = (start, end) => ({
  types: FETCH_LIBRARY_PLAYLISTS,
  payload: {start, end},
  meta: {
    plex: ({library}) => normalize(library.playlists(
      {start, size: end - start})),
  },
})

export const fetchLibraryPlaylistsRange = cacheList(
  (start, end) => ({
    range: [start, end],
    selectors,
    dispatch: (range) => forceFetchLibraryPlaylistsRange(range[0], range[1]),
  }),
)
