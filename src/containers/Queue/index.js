import React from 'react'
import {connect} from 'react-redux'

import Queue from '../../components/Queue'

function QueueContainer (props) {
  const {queue, selectedIndex} = props

  return (
    <Queue
      tracks={queue}
      selectedIndex={selectedIndex}
    />
  )
}

export default connect((state) => ({
}))(QueueContainer)
