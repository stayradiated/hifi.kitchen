import {combineReducers} from 'redux'

import {reducer as all} from './all'
import {reducer as albums} from './albums'

export default combineReducers({
  all,
  albums,
})
