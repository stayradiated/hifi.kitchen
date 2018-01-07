import { compose, createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { routerReducer } from 'react-router-redux'
import persistState from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

import * as hifiRedux from '@stayradiated/hifi-redux'

const rootReducer = hifiRedux.createRootReducer({
  reducers: {
    routing: routerReducer
  }
})

export default function store (options = {}) {
  const middleware = applyMiddleware(
    ...options.middleware,
    ...hifiRedux.middleware,
    createLogger({
      predicate: () => process.env.NODE_ENV !== 'production',
      collapsed: true
    })
  )

  const storage = filter([
    'queue',
    'user',
    'plex.instance.serverId',
    'ui.librarySectionId'
  ])(adapter(window.localStorage))

  return createStore(rootReducer, compose(
    middleware,
    persistState(storage, 'plex')
  ))
}
