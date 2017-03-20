import {combineReducers} from 'redux'

import {reducer as albums} from './albums'
import {reducer as artists} from './artists'
import {reducer as playlists} from './playlists'
import sections from './sections'

export default combineReducers({
  albums,
  artists,
  sections,
  playlists,
})
