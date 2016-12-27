import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import PlayQueue from '../../components/PlayQueue'

import {selectors as getQueue} from '../../stores/queue'
import {selectors as getTracks} from '../../stores/tracks'

class PlayQueueContainer extends Component {
  static propTypes = {
    queue: PropTypes.shape({}),
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render () {
    const {queue, tracks} = this.props

    if (queue == null) {
      return null
    }

    return (
      <PlayQueue queue={queue} tracks={tracks} />
    )
  }
}

export default connect((state) => ({
  queue: getQueue.value(state),
  tracks: getTracks.values(state),
}))(PlayQueueContainer)
