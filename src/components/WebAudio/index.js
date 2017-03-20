import {Children, Component, PropTypes} from 'react'

import WebAudioContext from '@stayradiated/web-audio'

const audioContext = new window.AudioContext()

export default class WebAudio extends Component {
  static propTypes = {
    source: PropTypes.string,
    duration: PropTypes.number,
    children: PropTypes.func.isRequired,
    updateInterval: PropTypes.number.isRequired,
  }

  static defaultProps = {
    updateInterval: 500,
  }

  constructor () {
    super()

    this.state = {
      paused: true,
      buffered: 0,
      currentTime: 0,
      duration: 0,
    }

    this.interval = null

    this.audio = new WebAudioContext({
      context: audioContext,
    })

    this.updateState = this.updateState.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)

    this.audio.onProgress = this.updateState
    this.audio.onLoad = this.updateState
    this.audio.onPlay = this.updateState
    this.audio.onPause = this.updateState
    this.audio.onStop = this.updateState
  }

  componentWillMount () {
    const {source, updateInterval} = this.props

    this.interval = setInterval(() => {
      this.updateState()
    }, updateInterval)

    this.updateSource(source)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.source !== this.props.source) {
      this.updateSource(nextProps.source)
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.audio.stop()
  }

  updateState () {
    const {audio} = this
    const {duration} = this.props
    const {loading, paused} = audio
    const buffered = audio.buffered()
    const currentTime = audio.currentTime()

    this.setState({
      paused,
      buffered,
      currentTime,
      duration: loading ? duration : buffered,
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
    })

    return Children.only(children)
  }
}
