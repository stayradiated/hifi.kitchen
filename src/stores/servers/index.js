import {combineReducers} from 'redux'

import {reducer as account} from './account'
import {reducer as devices} from './devices'
import {reducer as connections} from './connections'
import {reducer as status} from './status'

export default combineReducers({
  account,
  devices,
  connections,
  status,
})
