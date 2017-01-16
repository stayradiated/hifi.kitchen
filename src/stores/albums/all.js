import {ALBUM} from 'perplexed'

import {createLibraryTypeStore} from '../../storeTemplates'

import {
  SEARCH,
  FETCH_LIBRARY_ALBUMS,
  FETCH_ARTIST_ALBUMS,
} from '../constants'

module.exports = createLibraryTypeStore({
  type: ALBUM,
  name: 'Album',
  entity: 'albums',
  rootSelector: (state) => state.albums.all,
  mergeActions: [
    SEARCH.SUCCESS,
    FETCH_LIBRARY_ALBUMS.SUCCESS,
    FETCH_ARTIST_ALBUMS.SUCCESS,
  ],
})
