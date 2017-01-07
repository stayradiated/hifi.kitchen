import {ALBUM} from 'perplexed'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  type: ALBUM,
  name: 'Albums',
  rootSelector: (state) => state.library.albums,
})
