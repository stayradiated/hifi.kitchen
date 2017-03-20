import {normalize, PLAYLIST} from 'perplexed'

import {FETCH_LIBRARY_PLAYLISTS} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  type: PLAYLIST,
  name: 'Playlists',
  constant: FETCH_LIBRARY_PLAYLISTS,
  rootSelector: (state) => state.library.playlists,
  reducerOptions: {
    getValues: (action) => action.value.result.id.playlists,
    getTotal: (action) => action.value.result.id.totalSize,
  },
  fetchItems: ({library}, section, start, end) =>
    normalize(library.playlists(
      {start, size: end - start})),
})
