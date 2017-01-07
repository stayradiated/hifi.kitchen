import {ARTIST} from 'perplexed'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  type: ARTIST,
  name: 'Artists',
  rootSelector: (state) => state.library.artists,
})
