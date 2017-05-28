import {normalize} from 'perplexed'

import {FETCH_SEARCH_RESULTS} from '../constants'

export const search = (query, limit) => ({
  types: FETCH_SEARCH_RESULTS,
  payload: {query, limit},
  meta: {
    plex: ({library}) => normalize(library.searchAll(query, limit)),
  },
})
