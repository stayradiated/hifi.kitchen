import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Controls from '../../components/Controls'

import {rateTrack} from '../../stores/tracks/all/actions'
import {playNextTrack, playPrevTrack} from '../../stores/queue/actions'

import {track as getSelectedTrack} from '../../stores/queue/selectors'

class ControlsContainer extends Component {
  static propTypes = {
    track: PropTypes.shape({}),
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handlePrevTrack = this.handlePrevTrack.bind(this)
    this.handleNextTrack = this.handleNextTrack.bind(this)
    this.handleRateTrack = this.handleRateTrack.bind(this)
  }

  handleNextTrack () {
    const {dispatch} = this.props
    dispatch(playNextTrack())
  }

  handlePrevTrack () {
    const {dispatch} = this.props
    dispatch(playPrevTrack())
  }

  handleRateTrack (track, rating) {
    const {dispatch} = this.props
    dispatch(rateTrack(track, rating))
  }

  render () {
    const {track} = this.props

    if (track == null) {
      return null
    }

    return (
      <Controls
        track={track}
        onNextTrack={this.handleNextTrack}
        onPrevTrack={this.handlePrevTrack}
        onRateTrack={this.handleRateTrack}
      />
    )
  }
}

export default connect((state) => ({
  track: getSelectedTrack(state),
}))(ControlsContainer)
