import {createStore, applyMiddleware, combineReducers} from 'redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import ReduxAsync from '@stayradiated/mandarin'
import createReduxLogger from 'redux-logger'
import {routerReducer} from 'react-router-redux'

import albums from './albums'
import library from './library'
import tracks from './tracks'
import queue from './queue'

const rootReducer = combineReducers({
  albums,
  library,
  tracks,
  queue,
  routing: routerReducer,
})

export default function store () {
  return createStore(rootReducer, applyMiddleware(
    ReduxPromise,
    ReduxThunk,
    ReduxAsync,
    createReduxLogger({
      collapsed: true,
    }),
  ))
}
