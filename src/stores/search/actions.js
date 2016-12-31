import plex from '../../plex'

import {SEARCH} from '../constants'

export const search = (query, limit) => ({
  types: SEARCH,
  payload: {query, limit},
  meta: {
    async: plex.normalizedSearchAll(query, limit),
  },
})
