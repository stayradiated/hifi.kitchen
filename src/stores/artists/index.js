import {combineReducers} from 'redux'

import all from './all'
import albums from './albums'

export default combineReducers({
  all,
  albums,
})
