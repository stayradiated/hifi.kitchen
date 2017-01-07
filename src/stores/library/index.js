import {combineReducers} from 'redux'

import {reducer as albums} from './albums'
import {reducer as artists} from './artists'
import sections from './sections'
import playlists from './playlists'

export default combineReducers({
  albums,
  artists,
  sections,
  playlists,
})
