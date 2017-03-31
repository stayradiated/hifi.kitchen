import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import Queue from '../../components/Queue'

import * as selectQueue from '../../stores/queue/selectors'

function QueueContainer (props) {
  const {tracks, selectedIndex} = props

  return (
    <Queue
      tracks={tracks}
      selectedIndex={selectedIndex}
    />
  )
}

QueueContainer.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedIndex: PropTypes.number,
}

export default connect((state) => ({
  selectedIndex: selectQueue.selectedItemOffset(state),
  tracks: selectQueue.tracks(state),
}))(QueueContainer)
