import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import './index.css'
import './css/fontello.css'

import Albums from './routes/Albums'

import createStore from './stores'

const store = createStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/library/:section(/albums/:id)' component={Albums} />
    </Router>
  </Provider>
, document.getElementById('root'))
