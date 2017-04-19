import noop from 'nop'
import {Children, Component} from 'react'
import PropTypes from 'prop-types'
import WebAudioContext from '@stayradiated/web-audio'

import {
  PLAYER_STATE_PAUSED,
  PLAYER_STATE_PLAYING,
  PLAYER_STATE_STOPPED,
} from '../../stores/constants'

const AUDIO_CONTEXT = new window.AudioContext()

export default class WebAudio extends Component {
  static propTypes = {
    source: PropTypes.string,
    playerState: PropTypes.string,
    onDurationChange: PropTypes.func,
    onEnd: PropTypes.func,
    onProgress: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onDurationChange: noop,
    onEnd: noop,
    onProgress: noop,
    onTimeUpdate: noop,
  }

  constructor () {
    super()

    this.state = {
      buffered: 0,
      currentTime: 0,
      duration: 0,
    }

    this.audio = new WebAudioContext({
      context: AUDIO_CONTEXT,
    })

    this.handleAudioDurationChange = this.handleAudioDurationChange.bind(this)
    this.handleAudioEnded = this.handleAudioEnded.bind(this)
    this.handleAudioProgress = this.handleAudioProgress.bind(this)
    this.handleAudioTimeUpdate = this.handleAudioTimeUpdate.bind(this)
  }

  componentWillMount () {
    this.audio.audioElement.addEventListener('durationchange', this.handleAudioDurationChange)
    this.audio.audioElement.addEventListener('ended', this.handleAudioEnded)
    this.audio.audioElement.addEventListener('progress', this.handleAudioProgress)
    this.audio.audioElement.addEventListener('timeupdate', this.handleAudioTimeUpdate)

    this.receiveProps({}, this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.receiveProps(this.props, nextProps)
  }

  componentWillUnmount () {
    this.audio.audioElement.removeEventListener('durationchange', this.handleAudioDurationChange)
    this.audio.audioElement.removeEventListener('ended', this.handleAudioEnded)
    this.audio.audioElement.removeEventListener('pause', this.handleAudioPause)
    this.audio.audioElement.removeEventListener('progress', this.handleAudioProgress)
    this.audio.audioElement.removeEventListener('timeupdate', this.handleAudioTimeUpdate)

    this.audio.stop()
  }

  receiveProps (prevProps, props) {
    const {source, playerState} = props
    const {source: prevSource, playerState: prevPlayerState} = prevProps

    if (source !== prevSource) {
      this.updateSource(source)
      if (playerState === PLAYER_STATE_PLAYING) {
        this.handlePlay()
      }
    }

    if (playerState !== prevPlayerState) {
      switch (playerState) {
        case PLAYER_STATE_PAUSED:
          this.handlePause()
          break
        case PLAYER_STATE_PLAYING:
          this.handlePlay()
          break
        case PLAYER_STATE_STOPPED:
          this.handleStop()
          break
        default:
          console.error('Could not handle playerState:', playerState)
      }
    }
  }

  handleAudioDurationChange () {
    const duration = this.audio.duration()
    this.setState({duration})
    this.props.onDurationChange(duration)
  }

  handleAudioEnded () {
    this.props.onEnd()
  }

  handleAudioProgress () {
    const buffered = this.audio.buffered()
    this.setState({buffered})
    this.props.onProgress(buffered)
  }

  handleAudioTimeUpdate () {
    const currentTime = this.audio.currentTime()
    this.setState({currentTime})
    this.props.onTimeUpdate(currentTime)
  }

  updateSource (source) {
    this.audio.loadSource(source)
  }

  handlePlay () {
    this.audio.play()
  }

  handlePause () {
    this.audio.pause()
  }

  handleStop () {
    this.audio.stop()
  }

  render () {
    const {children: getChildren} = this.props
    const {duration, buffered, currentTime} = this.state

    const children = getChildren({
      buffered,
      currentTime,
      duration,
    })

    return Children.only(children)
  }
}
