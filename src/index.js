import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Redirect, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import './index.css'
import './css/fontello.css'

import Albums from './routes/Albums'
import App from './routes/App'
import Artists from './routes/Artists'
import Playlists from './routes/Playlists'
import Search from './routes/Search'
import InfiniteList from './routes/InfiniteList'

import createStore from './stores'

const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Redirect from='/' to='/library' />
      <Route path='/library(/:section)' component={App}>
        <Route path='test' component={InfiniteList} />
        <Route path='albums(/:id)' component={Albums} />
        <Route path='artists(/:id)' component={Artists} />
        <Route path='playlists(/:id)' component={Playlists} />
        <Route path='search(/:query)' component={Search} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'))
