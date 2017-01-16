import {normalize} from 'perplexed'

import {SEARCH} from '../constants'

export const search = (query, limit) => ({
  types: SEARCH,
  payload: {query, limit},
  meta: {
    plex: ({library}) => normalize(library.searchAll(query, limit)),
  },
})
