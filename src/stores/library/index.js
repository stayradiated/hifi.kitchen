import {combineReducers} from 'redux'

import albums from './albums'
import artists from './artists'
import sections from './sections'
import playlists from './playlists'

export default combineReducers({
  albums,
  artists,
  sections,
  playlists,
})
