import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import './index.css'
import './css/fontello.css'

import Albums from './routes/Albums'
import App from './routes/App'

import createStore from './stores'

const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <Route path='/library/:section(/albums/:id)' component={Albums} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'))
