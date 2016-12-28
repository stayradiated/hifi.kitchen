import {combineReducers} from 'redux'

import albums from './albums'
import sections from './sections'

export default combineReducers({
  albums,
  sections,
})
