import {combineReducers} from 'redux'

import all from './all'
import tracks from './tracks'

export default combineReducers({
  all,
  tracks,
})
