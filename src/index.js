import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { Route } from 'react-router'

import 'react-virtualized/styles.css'

import './styles.css'
import createStore from './store'

import App from './routes/App'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Route path='/' component={App} />
    </HashRouter>
  </Provider>
  , document.getElementById('root'))
