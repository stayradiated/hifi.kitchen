import {combineReducers} from 'redux'

import auth from './auth'
import instance from './instance'
import pin from './pin'

export default combineReducers({
  auth,
  instance,
  pin,
})
