import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import throttle from 'lodash.throttle'

import WebAudio from '../../components/WebAudio'
import Controls from '../../components/Controls'

import {
  PLAYER_STATE_PAUSED,
  PLAYER_STATE_PLAYING,
  rateTrack,
  fetchQueue,
  playNextTrack,
  playPrevTrack,
  stopQueue,
  toggleShuffleQueue,
  sendTimelinePlay,
  sendTimelinePause,
  sendTimelineStop,
  setPlayerCurrentTime,
  selectTimeline,
  selectDisplayPlayer,
  setDisplayPlayer,
  toggleDisplayPlayer,
  toggleDisplayQueue,
  selectQueue
} from '@stayradiated/hifi-redux'

class ControlsContainer extends Component {
  static propTypes = {
    queueId: PropTypes.number,
    queueItem: PropTypes.shape({
      id: PropTypes.number,
      track: PropTypes.number
    }),
    track: PropTypes.shape({}),
    trackSrc: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    shuffled: PropTypes.bool.isRequired,
    playerState: PropTypes.string,
    fullScreenMode: PropTypes.bool,
    onNavigate: PropTypes.func.isRequired
  }

  constructor () {
    super()

    this.handleNextTrack = this.handleNextTrack.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePrevTrack = this.handlePrevTrack.bind(this)
    this.handleQueue = this.handleQueue.bind(this)
    this.handlePlayer = this.handlePlayer.bind(this)
    this.handleRateTrack = this.handleRateTrack.bind(this)
    this.handleShuffle = this.handleShuffle.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleTimeUpdate = throttle(this.handleTimeUpdate.bind(this), 1000)
  }

  componentWillMount () {
    const { dispatch, queueId } = this.props
    if (queueId != null) {
      dispatch(fetchQueue(queueId))
    }
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch } = nextProps

    const nextTrack = nextProps.track
    const thisTrack = this.props.track

    const nextTrackId = nextTrack && nextTrack.id
    const thisTrackId = thisTrack && thisTrack.id

    if (thisTrackId !== nextTrackId) {
      if (thisTrackId != null) {
        dispatch(sendTimelineStop(this.props.queueItem))
      }
      if (nextTrackId != null && nextProps.playerState === PLAYER_STATE_PLAYING) {
        dispatch(sendTimelinePlay(nextProps.queueItem))
      }
    }
  }

  handleNextTrack () {
    const { dispatch } = this.props
    dispatch(playNextTrack())
  }

  handlePrevTrack () {
    const { dispatch } = this.props
    dispatch(playPrevTrack())
  }

  handleRateTrack (track, rating) {
    const { dispatch } = this.props
    dispatch(rateTrack(track, rating))
  }

  handleStop () {
    const { dispatch } = this.props
    dispatch(stopQueue())
    dispatch(setDisplayPlayer(false))
  }

  handlePause () {
    const { dispatch, queueItem } = this.props
    dispatch(sendTimelinePause(queueItem))
  }

  handlePlay () {
    const { dispatch, queueItem } = this.props
    dispatch(sendTimelinePlay(queueItem))
  }

  handleTimeUpdate (currentTime) {
    const { dispatch, queueItem } = this.props
    if (queueItem != null) {
      dispatch(setPlayerCurrentTime(queueItem, Math.round(currentTime * 1000)))
    }
  }

  handleQueue () {
    const { dispatch } = this.props
    dispatch(toggleDisplayQueue())
  }

  handlePlayer () {
    const { dispatch } = this.props
    dispatch(toggleDisplayPlayer())
  }

  handleShuffle () {
    const { dispatch } = this.props
    dispatch(toggleShuffleQueue())
  }

  render () {
    const {
      track, trackSrc, shuffled, playerState, fullScreenMode,
      onNavigate
    } = this.props

    if (track == null) {
      return null
    }

    return (
      <WebAudio
        duration={track.duration / 1000}
        onEnd={this.handleNextTrack}
        onTimeUpdate={this.handleTimeUpdate}
        playerState={playerState}
        source={trackSrc}
      >
        {(audio) => (
          <Controls
            audio={audio}
            onNext={this.handleNextTrack}
            onPause={this.handlePause}
            onPlay={this.handlePlay}
            onPrev={this.handlePrevTrack}
            onQueue={this.handleQueue}
            onPlayer={this.handlePlayer}
            onRateTrack={this.handleRateTrack}
            onShuffle={this.handleShuffle}
            onStop={this.handleStop}
            paused={playerState === PLAYER_STATE_PAUSED}
            shuffled={shuffled}
            track={track}
            fullScreenMode={fullScreenMode}
            onNavigate={onNavigate}
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
  shuffled: selectQueue.shuffled(state),
  playerState: selectTimeline.playerState(state),
  fullScreenMode: selectDisplayPlayer(state)
}))(ControlsContainer)
