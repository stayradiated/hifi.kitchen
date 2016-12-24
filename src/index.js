import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'

import './index.css'

import Albums from './routes/Albums'

import createStore from './stores'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/(albums/:id)' component={Albums} />
    </Router>
  </Provider>
, document.getElementById('root'))
