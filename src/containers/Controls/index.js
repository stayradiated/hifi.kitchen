import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {selectors as getQueue} from '../../stores/queue'

import Controls from '../../components/Controls'

class ControlsContainer extends Component {
  static propTypes = {
    track: PropTypes.shape({}),
  }

  render () {
    const {track} = this.props

    if (track == null) {
      return null
    }

    return (
      <Controls
        track={track}
        onNextTrack={() => console.log('NEXT TRACK')}
        onPrevTrack={() => console.log('PREV TRACK')}
      />
    )
  }
}

export default connect((state) => ({
  track: getQueue.track(state),
}))(ControlsContainer)
