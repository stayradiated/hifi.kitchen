import noop from 'nop'
import {Children, Component, PropTypes} from 'react'

import WebAudioContext from '@stayradiated/web-audio'

const AUDIO_CONTEXT = new window.AudioContext()

export default class WebAudio extends Component {
  static propTypes = {
    source: PropTypes.string,
    onEnd: PropTypes.func,
    onStop: PropTypes.func,
    onUpdate: PropTypes.func,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onEnd: noop,
    onUpdate: noop,
    onStop: noop,
  }

  constructor () {
    super()

    this.state = {
      paused: true,
      buffered: 0,
      currentTime: 0,
      duration: 0,
    }

    this.audio = new WebAudioContext({
      context: AUDIO_CONTEXT,
    })

    this.updateState = this.updateState.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleAudioEnded = this.handleAudioEnded.bind(this)
  }

  componentWillMount () {
    const {source} = this.props

    this.updateSource(source)

    this.audio.audioElement.addEventListener('durationchange', this.updateState)
    this.audio.audioElement.addEventListener('ended', this.handleAudioEnded)
    this.audio.audioElement.addEventListener('pause', this.updateState)
    this.audio.audioElement.addEventListener('play', this.updateState)
    this.audio.audioElement.addEventListener('progress', this.updateState)
    this.audio.audioElement.addEventListener('timeupdate', this.updateState)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.source !== this.props.source) {
      this.updateSource(nextProps.source)
    }
  }

  componentWillUnmount () {
    this.audio.audioElement.removeEventListener('durationchange', this.updateState)
    this.audio.audioElement.removeEventListener('ended', this.handleAudioEnded)
    this.audio.audioElement.removeEventListener('pause', this.updateState)
    this.audio.audioElement.removeEventListener('play', this.updateState)
    this.audio.audioElement.removeEventListener('progress', this.updateState)
    this.audio.audioElement.removeEventListener('timeupdate', this.updateState)

    this.audio.stop()
  }

  handleAudioEnded () {
    this.props.onEnd()
  }

  updateState () {
    const {audio} = this
    const paused = audio.paused()
    const buffered = audio.buffered()
    const currentTime = audio.currentTime()
    const duration = audio.duration()

    const status = {
      paused,
      buffered,
      currentTime,
      duration,
    }

    this.setState((previousStatus) => {
      this.props.onUpdate(status, previousStatus)
      return status
    })
  }

  updateSource (source) {
    this.audio.loadSource(source)
    this.audio.play()
  }

  handlePlay () {
    this.audio.play()
  }

  handlePause () {
    this.audio.pause()
  }

  handleStop () {
    this.audio.stop()
    this.props.onStop()
  }

  render () {
    const {children: getChildren} = this.props
    const {duration, paused, buffered, currentTime} = this.state

    const children = getChildren({
      buffered,
      currentTime,
      duration,
      paused,
      onPlay: this.handlePlay,
      onPause: this.handlePause,
      onStop: this.handleStop,
    })

    return Children.only(children)
  }
}
