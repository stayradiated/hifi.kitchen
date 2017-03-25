import React from 'react'
import ReactDOM from 'react-dom'
import {createHistory} from 'history'
import {Router, Route, useRouterHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import './styles.css'

import App from './routes/App'
import Login from './routes/Login'
import Settings from './routes/Settings'
import Library from './routes/Library'

import createStore from './stores'

import {selectUser} from './stores/user'
import {selectPlex} from './stores/plex/instance'

const AlbumInfo = null
const ArtistInfo = null
const PlaylistInfo = null

const store = createStore()
const browserHistory = useRouterHistory(createHistory)({
  basename: '/simplex',
})
const history = syncHistoryWithStore(browserHistory, store)

const onEnterApp = (_, replace) => {
  const state = store.getState()
  if (selectUser.loggedIn(state)) {
    replace('/library')
  } else {
    replace('/login')
  }
}

const onEnterLogin = (_, replace) => {
  const state = store.getState()
  if (selectUser.loggedIn(state)) {
    replace('/settings')
  }
}

const onEnterSettings = (_, replace) => {
  const state = store.getState()
  if (selectUser.loggedIn(state) === false) {
    replace('/login')
  }
}

const onEnterLibrary = (_, replace) => {
  const state = store.getState()
  if (selectPlex.librarySectionId(state) == null) {
    replace('/settings')
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path='/' onEnter={onEnterApp} />
        <Route path='/login' component={Login} onEnter={onEnterLogin} />
        <Route path='/settings' component={Settings} onEnter={onEnterSettings} />
        <Route path='/library' component={Library} onEnter={onEnterLibrary}>
          <Route path='albums/:albumId' component={AlbumInfo} />
          <Route path='artists/:artistId' component={ArtistInfo} />
          <Route path='playlists:playlistId' component={PlaylistInfo} />
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'))
