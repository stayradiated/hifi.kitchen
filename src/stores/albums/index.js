import {combineReducers} from 'redux'

import {reducer as all} from './all'
import tracks from './tracks'

export default combineReducers({
  all,
  tracks,
})
