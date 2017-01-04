import {cacheList} from '@stayradiated/mandarin'
import {normalizeType, ALBUM} from 'perplexed'

import plex from '../../../plex'
import {FETCH_LIBRARY_ALBUMS} from '../../constants'
import * as selectors from './selectors'

export const forceFetchLibraryAlbums = (section, start, end) => ({
  types: FETCH_LIBRARY_ALBUMS,
  payload: {start, end},
  meta: {
    async: plex.albums(section, {start, size: end - start})
      .then((res) => normalizeType(ALBUM, res)),
  },
})

export const fetchLibraryAlbumsRange = cacheList(
  (section, start, end) => ({
    range: [start, end],
    selectors,
    dispatch: (range) => forceFetchLibraryAlbums(
      section, range[0], range[1]),
  }),
)
