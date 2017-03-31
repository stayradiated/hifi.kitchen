import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import throttle from 'lodash.throttle'

import WebAudio from '../../components/WebAudio'
import Controls from '../../components/Controls'

import {
  rateTrack,
} from '../../stores/tracks/all'
import {
  fetchQueue,
  playNextTrack,
  playPrevTrack,
  stopQueue,
} from '../../stores/queue/actions'
import {
  sendTimelinePlay,
  sendTimelinePause,
  sendTimelineStop,
  setPlayerCurrentTime,
} from '../../stores/timeline/actions'
import {
  toggleDisplayQueue,
} from '../../stores/ui'

import * as selectQueue from '../../stores/queue/selectors'

class ControlsContainer extends Component {
  static propTypes = {
    queueId: PropTypes.number,
    queueItem: PropTypes.shape({
      id: PropTypes.number,
      track: PropTypes.number,
    }),
    track: PropTypes.shape({}),
    trackSrc: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handlePrevTrack = this.handlePrevTrack.bind(this)
    this.handleNextTrack = this.handleNextTrack.bind(this)
    this.handleRateTrack = this.handleRateTrack.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleUpdate = throttle(this.handleUpdate.bind(this), 500)
    this.handleQueue = this.handleQueue.bind(this)
  }

  componentWillMount () {
    const {dispatch, queueId} = this.props
    if (queueId != null) {
      dispatch(fetchQueue(queueId))
    }
  }

  componentWillReceiveProps (nextProps) {
    const {dispatch} = nextProps

    const nextTrack = nextProps.track
    const thisTrack = this.props.track

    const nextTrackId = nextTrack && nextTrack.id
    const thisTrackId = thisTrack && thisTrack.id

    if (thisTrackId !== nextTrackId) {
      if (thisTrackId != null) {
        dispatch(sendTimelineStop(this.props.queueItem))
      }
      if (nextTrackId != null) {
        dispatch(sendTimelinePlay(nextProps.queueItem))
      }
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

  handleStop () {
    const {dispatch} = this.props
    dispatch(stopQueue())
  }

  handleUpdate (status, previousStatus) {
    const {dispatch, queueItem} = this.props

    if (status.paused !== previousStatus.paused) {
      if (status.paused) {
        dispatch(sendTimelinePause(queueItem))
      } else {
        dispatch(sendTimelinePlay(queueItem))
      }
    }

    dispatch(setPlayerCurrentTime(Math.round(status.currentTime * 1000)))
  }

  handleQueue () {
    const {dispatch} = this.props
    dispatch(toggleDisplayQueue())
  }

  render () {
    const {track, trackSrc} = this.props

    if (track == null) {
      return null
    }

    return (
      <WebAudio
        source={trackSrc}
        duration={track.duration / 1000}
        onStop={this.handleStop}
        onUpdate={this.handleUpdate}
        onEnd={this.handleNextTrack}
      >
        {(audio) => (
          <Controls
            track={track}
            audio={audio}
            paused={audio.paused}
            onPause={audio.onPause}
            onPlay={audio.onPlay}
            onStop={audio.onStop}
            onNext={this.handleNextTrack}
            onPrev={this.handlePrevTrack}
            onRateTrack={this.handleRateTrack}
            onQueue={this.handleQueue}
          />
        )}
      </WebAudio>
    )
  }
}

export default connect((state) => ({
  queueId: selectQueue.queueId(state),
  queueItem: selectQueue.queueItem(state),
  track: selectQueue.track(state),
  trackSrc: selectQueue.trackSrc(state),
}))(ControlsContainer)
