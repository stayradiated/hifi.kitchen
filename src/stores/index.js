import {compose, createStore, applyMiddleware, combineReducers} from 'redux'
import ReduxPromise from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import ReduxAsync from '@stayradiated/mandarin'
import {createLogger} from 'redux-logger'
import {routerReducer} from 'react-router-redux'
import persistState from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

// middleware
import plexMiddleware from '../middleware/plex'

// reducers
import albums from './albums'
import artists from './artists'
import library from './library'
import playlists from './playlists'
import plex from './plex'
import queue from './queue'
import servers from './servers'
import search from './search'
import timeline from './timeline'
import tracks from './tracks'
import user from './user'

const rootReducer = combineReducers({
  albums,
  artists,
  library,
  playlists,
  plex,
  queue,
  servers,
  routing: routerReducer,
  search,
  timeline,
  tracks,
  user,
})

export default function store (options = {}) {
  const middleware = applyMiddleware(
    ...options.middleware,
    ReduxPromise,
    ReduxThunk,
    plexMiddleware,
    ReduxAsync,
    createLogger({
      // predicate: () => false,
      collapsed: true,
    }),
  )

  const storage = filter([
    'queue',
    'user',
    'plex.instance.serverId',
    'plex.instance.librarySectionId',
  ])(adapter(window.localStorage))

  return createStore(rootReducer, compose(
    middleware,
    persistState(storage, 'plex'),
  ))
}
