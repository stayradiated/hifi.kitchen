import {cacheValue} from '@stayradiated/mandarin'

import plex from '../../../plex'
import {FETCH_LIBRARY_SECTIONS} from '../../constants'
import * as selectors from './selectors'

export const forceFetchLibrarySections = () => ({
  types: FETCH_LIBRARY_SECTIONS,
  meta: {
    async: plex.sections(),
  },
})

export const fetchLibrarySections = cacheValue(
  forceFetchLibrarySections,
  () => ({
    selectors,
  }),
)
