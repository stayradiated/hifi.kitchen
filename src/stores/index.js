import {compose, createStore, applyMiddleware, combineReducers} from 'redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import ReduxAsync from '@stayradiated/mandarin'
import createReduxLogger from 'redux-logger'
import {routerReducer} from 'react-router-redux'
import persistState from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

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
  const middleware = applyMiddleware(
    ReduxPromise,
    ReduxThunk,
    ReduxAsync,
    createReduxLogger({
      collapsed: true,
    }),
  )

  const storage = filter([
    // 'albums',
    // 'library',
    'queue',
    // 'tracks',
  ])(adapter(window.localStorage))

  return createStore(rootReducer, compose(
    middleware,
    persistState(storage, 'plex'),
  ))
}
