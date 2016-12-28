import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'

import Controls from '../../components/Controls'

import {rateTrack} from '../../stores/tracks/all/actions'
import {playNextTrack, playPrevTrack} from '../../stores/queue/actions'
import {
  sendTimelinePlay,
  sendTimelinePause,
  sendTimelineStop,
  setPlayerCurrentTime,
} from '../../stores/timeline/actions'

import * as getQueue from '../../stores/queue/selectors'

class ControlsContainer extends Component {
  static propTypes = {
    queueItem: PropTypes.shape({
      id: PropTypes.number,
      track: PropTypes.object,
    }),
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handlePrevTrack = this.handlePrevTrack.bind(this)
    this.handleNextTrack = this.handleNextTrack.bind(this)
    this.handleRateTrack = this.handleRateTrack.bind(this)
    this.handleTimeUpdate = throttle(this.handleTimeUpdate.bind(this), 500)
  }

  componentWillReceiveProps (nextProps) {
    const {dispatch} = nextProps

    const nextQueueItem = nextProps.queueItem
    const thisQueueItem = this.props.queueItem

    const nextTrackId = nextQueueItem && nextQueueItem.track.id
    const thisTrackId = thisQueueItem && thisQueueItem.track.id

    if (thisTrackId != null && nextTrackId !== thisTrackId) {
      dispatch(sendTimelineStop(thisQueueItem))
    }
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

  handlePlay () {
    const {dispatch, queueItem} = this.props
    dispatch(sendTimelinePlay(queueItem))
  }

  handlePause () {
    const {dispatch, queueItem} = this.props
    dispatch(sendTimelinePause(queueItem))
  }

  handleTimeUpdate (currentTime) {
    const {dispatch} = this.props
    dispatch(setPlayerCurrentTime(Math.round(currentTime * 1000)))
  }

  render () {
    const {queueItem} = this.props

    if (queueItem == null) {
      return null
    }

    return (
      <Controls
        track={queueItem.track}
        onNextTrack={this.handleNextTrack}
        onPrevTrack={this.handlePrevTrack}
        onRateTrack={this.handleRateTrack}
        onEnd={this.handleNextTrack}
        onPlay={this.handlePlay}
        onPause={this.handlePause}
        onTimeUpdate={this.handleTimeUpdate}
      />
    )
  }
}

export default connect((state) => ({
  queueItem: getQueue.queueItem(state),
}))(ControlsContainer)
