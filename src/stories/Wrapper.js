import React from 'react'
import {Router} from 'react-router'
import createHistory from 'history/createHashHistory'

import 'react-virtualized/styles.css'

import '../styles.css'
import './styles.css'

const history = createHistory()

export default function Wrapper (story) {
  return (
    <Router history={history}>
      <div className='StoryBook-Wrapper'>
        <link
          href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Chewy:400'
          rel='stylesheet'
        />
        {story()}
      </div>
    </Router>
  )
}
