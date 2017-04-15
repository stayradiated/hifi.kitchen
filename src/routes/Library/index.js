import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import App from '../../components/App'

import {selectDisplayQueue} from '../../stores/ui'

function Library (props) {
  const {history, location, displayQueue} = props

  return (
    <App
      displayQueue={displayQueue}
      location={location}
      history={history}
    />
  )
}

Library.propTypes = {
  displayQueue: PropTypes.bool,
  location: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
}

export default connect((state) => ({
  displayQueue: selectDisplayQueue(state),
}))(Library)
