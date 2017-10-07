import {combineReducers} from 'redux'

import {reducer as all} from './all'
import {reducer as items} from './items'

export default combineReducers({
  all,
  items,
})
