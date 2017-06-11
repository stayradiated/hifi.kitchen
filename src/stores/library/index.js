import {combineReducers} from 'redux'

import {reducer as albums} from './albums'
import {reducer as artists} from './artists'
import {reducer as playlists} from './playlists'
import {reducer as playlistsRegular} from './playlistsRegular'
import {reducer as tracks} from './tracks'
import sections from './sections'

export default combineReducers({
  albums,
  artists,
  sections,
  playlists,
  playlistsRegular,
  tracks,
})
