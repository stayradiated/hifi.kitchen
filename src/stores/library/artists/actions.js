import {cacheList} from '@stayradiated/mandarin'
import {normalizeType, ARTIST} from 'perplexed'

import plex from '../../../plex'
import {FETCH_LIBRARY_ARTISTS} from '../../constants'
import * as selectors from './selectors'

export const forceFetchLibraryArtists = (section, start, end) => ({
  types: FETCH_LIBRARY_ARTISTS,
  payload: {start, end},
  meta: {
    async: plex.artists(section, {start, size: end - start})
      .then((res) => normalizeType(ARTIST, res)),
  },
})

export const fetchLibraryArtistsRange = cacheList(
  (section, start, end) => ({
    range: [start, end],
    selectors,
    dispatch: (range) => forceFetchLibraryArtists(section, range[0], range[1]),
  }),
)
