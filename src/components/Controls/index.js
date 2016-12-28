import React, {Component, PropTypes} from 'react'

import plex from '../../plex'

import './styles.css'

import TrackBar from '../TrackBar'
import TrackRating from '../TrackRating'

export default class Controls extends Component {
  static propTypes = {
    track: PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
    onNextTrack: PropTypes.func.isRequired,
    onPrevTrack: PropTypes.func.isRequired,
    onRateTrack: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {
      buffered: 0,
      currentTime: 0,
      duration: 0,
      playing: false,
    }

    this.timer = null

    this.audioDurationChange = this.audioDurationChange.bind(this)
    this.audioEnded = this.audioEnded.bind(this)
    this.audioPause = this.audioPause.bind(this)
    this.audioPlay = this.audioPlay.bind(this)
    this.audioProgress = this.audioProgress.bind(this)
    this.audioTimeUpdate = this.audioTimeUpdate.bind(this)
    this.handleToggleAudio = this.handleToggleAudio.bind(this)
  }

  componentDidMount () {
    this.audio = new Audio()
    this.audio.autoplay = true

    this.audio.addEventListener('durationchange', this.audioDurationChange)
    this.audio.addEventListener('ended', this.audioEnded)
    this.audio.addEventListener('pause', this.audioPause)
    this.audio.addEventListener('play', this.audioPlay)
    this.audio.addEventListener('progress', this.audioProgress)
    this.audio.addEventListener('timeupdate', this.audioTimeUpdate)

    this.updateAudioSource(this.props.track)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.track.id !== this.props.track.id) {
      this.updateAudioSource(nextProps.track)
    }
  }

  componentWillUnmount () {
    this.audio.removeEventListener('durationchange')
    this.audio.removeEventListener('ended')
    this.audio.removeEventListener('pause')
    this.audio.removeEventListener('play')
    this.audio.removeEventListener('progress')
    this.audio.removeEventListener('timeupdate')
  }

  updateAudioSource (track) {
    this.audio.src = plex.signUrl(track.media[0].part[0].key)
  }

  audioDurationChange () {
    this.setState({
      duration: this.audio.duration,
    })
  }

  audioEnded () {
    const {onEnd} = this.props
    onEnd()
  }

  audioPause () {
    const {onPause} = this.props
    this.setState({playing: false})
    onPause()
  }

  audioPlay () {
    const {onPlay} = this.props
    this.setState({playing: true})
    onPlay()
  }

  audioProgress () {
    const {buffered} = this.audio

    this.setState({
      buffered: buffered.length > 0 ? buffered.end(0) : 0,
    })
  }

  audioTimeUpdate () {
    const {onTimeUpdate} = this.props
    const {currentTime} = this.audio
    this.setState({currentTime})
    onTimeUpdate(currentTime)
  }

  handleToggleAudio () {
    if (this.audio.paused) {
      this.audio.play()
    } else {
      this.audio.pause()
    }
  }

  render () {
    const {track, onNextTrack, onPrevTrack, onRateTrack} = this.props
    const {buffered, currentTime, duration, playing} = this.state

    if (track == null) {
      return null
    }

    const title = track.title
    const artist = track.grandparentTitle

    return (
      <div className='Controls-container'>
        {track != null &&
          <div className='Controls-trackDetails'>
            <span className='Controls-trackTitle'>
              {title}
            </span> &mdash; <span className='Controls-artistTitle'>
              {artist}
            </span>
          </div>}

        <div className='Controls-navigationBtns'>
          <button
            className='Controls-navigationBtn Controls-prevNextBtn icon icon-to-start'
            onClick={onPrevTrack}
          />

          <button
            className={playing
              ? 'Controls-navigationBtn Controls-playPauseBtn icon icon-pause'
              : 'Controls-navigationBtn Controls-playPauseBtn icon icon-play'}
            onClick={this.handleToggleAudio}
          />

          <button
            className='Controls-navigationBtn Controls-prevNextBtn icon icon-to-end'
            onClick={onNextTrack}
          />
        </div>

        <TrackBar
          buffered={buffered}
          currentTime={currentTime}
          duration={duration}
        />

        <TrackRating
          className='Controls-trackRating'
          track={track}
          onRate={onRateTrack}
        />
      </div>
    )
  }
}
