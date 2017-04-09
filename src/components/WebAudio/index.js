import noop from 'nop'
import {Children, Component} from 'react'
import PropTypes from 'prop-types'

import WebAudioContext from '@stayradiated/web-audio'

const AUDIO_CONTEXT = new window.AudioContext()

export default class WebAudio extends Component {
  static propTypes = {
    source: PropTypes.string,
    onDurationChange: PropTypes.func,
    onEnd: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onProgress: PropTypes.func,
    onStop: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    onDurationChange: noop,
    onEnd: noop,
    onPause: noop,
    onPlay: noop,
    onProgress: noop,
    onStop: noop,
    onTimeUpdate: noop,
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

    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleAudioDurationChange = this.handleAudioDurationChange.bind(this)
    this.handleAudioEnded = this.handleAudioEnded.bind(this)
    this.handleAudioPause = this.handleAudioPause.bind(this)
    this.handleAudioPlay = this.handleAudioPlay.bind(this)
    this.handleAudioProgress = this.handleAudioProgress.bind(this)
    this.handleAudioTimeUpdate = this.handleAudioTimeUpdate.bind(this)
  }

  componentWillMount () {
    const {source} = this.props

    this.updateSource(source)

    this.audio.audioElement.addEventListener('durationchange', this.handleAudioDurationChange)
    this.audio.audioElement.addEventListener('ended', this.handleAudioEnded)
    this.audio.audioElement.addEventListener('pause', this.handleAudioPause)
    this.audio.audioElement.addEventListener('play', this.handleAudioPlay)
    this.audio.audioElement.addEventListener('progress', this.handleAudioProgress)
    this.audio.audioElement.addEventListener('timeupdate', this.handleAudioTimeUpdate)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.source !== this.props.source) {
      this.updateSource(nextProps.source)
    }
  }

  componentWillUnmount () {
    this.audio.audioElement.removeEventListener('durationchange', this.handleAudioDurationChange)
    this.audio.audioElement.removeEventListener('ended', this.handleAudioEnded)
    this.audio.audioElement.removeEventListener('pause', this.handleAudioPause)
    this.audio.audioElement.removeEventListener('play', this.handleAudioPlay)
    this.audio.audioElement.removeEventListener('progress', this.handleAudioProgress)
    this.audio.audioElement.removeEventListener('timeupdate', this.handleAudioTimeUpdate)

    this.audio.stop()
  }

  handleAudioDurationChange () {
    const duration = this.audio.duration()
    this.setState({duration})
    this.props.onDurationChange(duration)
  }

  handleAudioEnded () {
    this.props.onEnd()
  }

  handleAudioPause () {
    this.setState({paused: true})
    this.props.onPause()
  }

  handleAudioPlay () {
    this.setState({paused: false})
    this.props.onPlay()
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
