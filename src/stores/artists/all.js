import {ARTIST} from 'perplexed'

import {createLibraryTypeStore} from '../../storeTemplates'

import {SEARCH} from '../constants'
import {FETCH_LIBRARY_ARTISTS} from '../library/artists'

module.exports = createLibraryTypeStore({
  type: ARTIST,
  name: 'Artist',
  entity: 'artists',
  rootSelector: (state) => state.artists.all,
  mergeActions: [
    SEARCH.SUCCESS,
    FETCH_LIBRARY_ARTISTS.SUCCESS,
  ],
})
