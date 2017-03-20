import {combineReducers} from 'redux'

import auth from './auth'
import instance from './instance'

export default combineReducers({
  auth,
  instance,
})
