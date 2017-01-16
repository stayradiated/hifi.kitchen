import {ALBUM} from 'perplexed'

import {FETCH_LIBRARY_ALBUMS} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  name: 'Albums',
  type: ALBUM,
  constant: FETCH_LIBRARY_ALBUMS,
  rootSelector: (state) => state.library.albums,
  reducerOptions: {
    getValues: (action) => action.value.result.id.albums,
  },
})
