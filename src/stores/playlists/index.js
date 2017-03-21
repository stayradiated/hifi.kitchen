import {combineReducers} from 'redux'

import {reducer as all} from './all'
import {reducer as tracks} from './tracks'

export default combineReducers({
  all,
  tracks,
})
