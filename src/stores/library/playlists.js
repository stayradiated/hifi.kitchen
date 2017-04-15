import {
  normalize,
  PLAYLIST,
  SORT_PLAYLISTS_BY_NAME,
  SORT_PLAYLISTS_BY_PLAYS,
  SORT_PLAYLISTS_BY_LAST_PLAYED,
  SORT_PLAYLISTS_BY_DURATION,
  SORT_PLAYLISTS_BY_DATE_ADDED,
  SORT_PLAYLISTS_BY_ITEM_COUNT,
} from 'perplexed'

import {FETCH_LIBRARY_PLAYLISTS, SORT_LIBRARY_PLAYLISTS} from '../constants'

import {createLibraryTypeList} from '../../storeTemplates'

module.exports = createLibraryTypeList({
  type: PLAYLIST,
  name: 'Playlists',
  actions: {
    fetch: FETCH_LIBRARY_PLAYLISTS,
    sort: SORT_LIBRARY_PLAYLISTS,
  },
  sort: {
    default: 'Date Added',
    descending: true,
    options: {
      Name: SORT_PLAYLISTS_BY_NAME,
      Plays: SORT_PLAYLISTS_BY_PLAYS,
      'Last Played': SORT_PLAYLISTS_BY_LAST_PLAYED,
      Duration: SORT_PLAYLISTS_BY_DURATION,
      'Date Added': SORT_PLAYLISTS_BY_DATE_ADDED,
      'Item Count': SORT_PLAYLISTS_BY_ITEM_COUNT,
    },
  },
  rootSelector: (state) => state.library.playlists,
  reducerOptions: {
    getValues: (action) => action.value.result.id.playlists,
    getTotal: (action) => action.value.result.id.totalSize,
  },
  fetchItems: ({library}, section, options) =>
    normalize(library.playlists(options)),
})
