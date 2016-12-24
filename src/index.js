import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'

import './index.css'

import Albums from './routes/Albums'
import Album from './routes/Album'

import createStore from './stores'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Albums}>
        <Route path='/albums/:id' component={Album} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('root'))
