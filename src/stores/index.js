import {createStore, applyMiddleware, combineReducers} from 'redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import ReduxAsync from '@stayradiated/mandarin'
import createReduxLogger from 'redux-logger'

import albums from './albums'
import albumTracks from './albumTracks'
import library from './library'
import tracks from './tracks'

const rootReducer = combineReducers({
  albums,
  albumTracks,
  library,
  tracks,
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
