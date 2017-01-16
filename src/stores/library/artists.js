import {ARTIST} from 'perplexed'

import {FETCH_LIBRARY_ARTISTS} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  type: ARTIST,
  name: 'Artists',
  constant: FETCH_LIBRARY_ARTISTS,
  rootSelector: (state) => state.library.artists,
  reducerOptions: {
    getValues: (action) => action.value.result.id.artists,
  },
})
