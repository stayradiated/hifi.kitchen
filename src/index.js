import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import './index.css'
import './css/fontello.css'

import Albums from './routes/Albums'
import App from './routes/App'
import Artists from './routes/Artists'
import Core from './routes/Core'
import Dashboard from './routes/Dashboard'
import Login from './routes/Login'
import Playlists from './routes/Playlists'
import Search from './routes/Search'
import Section from './routes/Section'
import Server from './routes/Server'

import createStore from './stores'

import {selectUser} from './stores/user'
import {selectPlex, initializePlex} from './stores/plex'

const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

// make sure plex client is initialized
// TODO: this seems wrong to have here
if (selectPlex.client(store.getState()) == null) {
  store.dispatch(initializePlex())
}

const requireLogin = (nextState, replace) => {
  if (selectUser.loggedIn(store.getState()) === false) {
    replace('/login')
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path='/login' component={Login} />
        <Route path='/' component={Core} onEnter={requireLogin}>
          <Route path='server/:serverId' component={Server}>
            <IndexRedirect to='dashboard' />
            <Route path='dashboard' component={Dashboard} />
            <Route path='sections/:sectionId' component={Section}>
              <IndexRedirect to='albums' />
              <Route path='albums(/:albumId)' component={Albums} />
              <Route path='artists(/:artistId)' component={Artists} />
            </Route>
            <Route path='playlists(/:playlistId)' component={Playlists} />
            <Route path='search(/:query)' component={Search} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'))
