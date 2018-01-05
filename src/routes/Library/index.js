import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import App from '../../components/App'

import { selectDisplayPlayer } from '@stayradiated/hifi-redux'

function Library (props) {
  const { history, location, displayPlayer } = props

  return (
    <App
      displayPlayer={displayPlayer}
      location={location}
      history={history}
    />
  )
}

Library.propTypes = {
  displayPlayer: PropTypes.bool,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired
}

export default connect((state) => ({
  displayPlayer: selectDisplayPlayer(state)
}))(Library)
