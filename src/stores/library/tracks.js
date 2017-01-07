import {TRACK} from 'perplexed'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  type: TRACK,
  name: 'Tracks',
  rootSelector: (state) => state.library.tracks,
})
