import {ALBUM} from 'perplexed'

import {createLibraryTypeStore} from '../../storeTemplates'

import {SEARCH} from '../constants'
import {FETCH_LIBRARY_ALBUMS} from '../library/albums'

module.exports = createLibraryTypeStore({
  type: ALBUM,
  name: 'Album',
  entity: 'albums',
  rootSelector: (state) => state.albums.all,
  mergeActions: [
    SEARCH.SUCCESS,
    FETCH_LIBRARY_ALBUMS.SUCCESS,
  ],
})
