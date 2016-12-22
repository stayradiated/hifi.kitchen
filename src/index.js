import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'

import './index.css'

import Albums from './routes/Albums'
import Album from './routes/Album'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Albums}>
      <Route path='/album/:id' component={Album} />
    </Route>
  </Router>
, document.getElementById('root'))
