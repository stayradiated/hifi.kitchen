import {ALBUM} from 'perplexed'

import {FETCH_ARTIST_ALBUMS} from '../constants'

import {createLibraryTypeChildrenStore} from '../../storeTemplates'

module.exports = createLibraryTypeChildrenStore({
  name: 'ArtistAlbums',
  type: ALBUM,
  constant: FETCH_ARTIST_ALBUMS,
  rootSelector: (state) => state.artists.albums,
  reducerOptions: {
    getValues: (action) => action.value.result.id.albums,
  },
})
