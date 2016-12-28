import {createStore, applyMiddleware, combineReducers} from 'redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import ReduxAsync from '@stayradiated/mandarin'
import createReduxLogger from 'redux-logger'
import {routerReducer} from 'react-router-redux'

import albums from './albums'
import library from './library'
import queue from './queue'
import timeline from './timeline'
import tracks from './tracks'

const rootReducer = combineReducers({
  albums,
  library,
  queue,
  timeline,
  tracks,
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
