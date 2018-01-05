import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import App from '../../components/App'

import { selectDisplayQueue, selectDisplayPlayer } from '@stayradiated/hifi-redux'

function Library (props) {
  const { history, location, displayQueue, displayPlayer } = props

  return (
    <App
      displayQueue={displayQueue}
      displayPlayer={displayPlayer}
      location={location}
      history={history}
    />
  )
}

Library.propTypes = {
  displayQueue: PropTypes.bool,
  displayPlayer: PropTypes.bool,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

export default connect((state) => ({
  displayQueue: selectDisplayQueue(state),
  displayPlayer: selectDisplayPlayer(state)
}))(Library)
