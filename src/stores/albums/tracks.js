import {TRACK} from 'perplexed'

import {FETCH_ALBUM_TRACKS} from '../constants'

import {createLibraryTypeChildrenStore} from '../../storeTemplates'

module.exports = createLibraryTypeChildrenStore({
  name: 'AlbumTracks',
  type: TRACK,
  constant: FETCH_ALBUM_TRACKS,
  rootSelector: (state) => state.albums.tracks,
  reducerOptions: {
    getValues: (action) => action.value.result.id.tracks,
  },
})
