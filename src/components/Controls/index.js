import React, {Component, PropTypes} from 'react'
import ClickOutside from 'react-click-outside'

import './styles.css'

import Icon from '../Icon'
import TrackBar from '../TrackBar'
import TrackRating from '../TrackRating'
import PlayQueueContainer from '../../containers/PlayQueue'

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
    onStop: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired,
    onTimeUpdate: PropTypes.func.isRequired,
  }

  static contextTypes = {
    library: PropTypes.shape({
      trackSrc: PropTypes.func,
    }).isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {
      buffered: 0,
      currentTime: 0,
      duration: 0,
      playing: false,

      playQueueOpen: false,
    }

    this.timer = null

    this.audioDurationChange = this.audioDurationChange.bind(this)
    this.audioEnded = this.audioEnded.bind(this)
    this.audioPause = this.audioPause.bind(this)
    this.audioPlay = this.audioPlay.bind(this)
    this.audioProgress = this.audioProgress.bind(this)
    this.audioTimeUpdate = this.audioTimeUpdate.bind(this)
    this.handleToggleAudio = this.handleToggleAudio.bind(this)
    this.handleStopAudio = this.handleStopAudio.bind(this)

    this.openPlayQueue = this.openPlayQueue.bind(this)
    this.closePlayQueue = this.closePlayQueue.bind(this)
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
    this.audio.removeEventListener('durationchange', this.audioDurationChange)
    this.audio.removeEventListener('ended', this.audioEnded)
    this.audio.removeEventListener('pause', this.audioPause)
    this.audio.removeEventListener('play', this.audioPlay)
    this.audio.removeEventListener('progress', this.audioProgress)
    this.audio.removeEventListener('timeupdate', this.audioTimeUpdate)
  }

  updateAudioSource (track) {
    const {library} = this.context
    this.audio.currentTime = 0
    this.audio.src = library.trackSrc(track)
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

  handleStopAudio () {
    const {onStop} = this.props
    this.audio.src = ''
    onStop()
  }

  openPlayQueue () {
    this.setState({playQueueOpen: true})
  }

  closePlayQueue () {
    this.setState({playQueueOpen: false})
  }

  render () {
    const {track, onNextTrack, onPrevTrack, onRateTrack} = this.props
    const {buffered, currentTime, duration, playing, playQueueOpen} = this.state

    if (track == null) {
      return null
    }

    const title = track.title
    const artist = track.originalTitle || track.grandparentTitle

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
          <Icon
            icon='to-start'
            className='Controls-navigationBtn Controls-prevNextBtn'
            onClick={onPrevTrack}
          />

          <Icon
            icon={playing ? 'pause' : 'play'}
            className='Controls-navigationBtn Controls-playPauseBtn'
            onClick={this.handleToggleAudio}
          />

          <Icon
            icon='stop'
            className='Controls-navigationBtn Controls-stopBtn'
            onClick={this.handleStopAudio}
          />

          <Icon
            icon='to-end'
            className='Controls-navigationBtn Controls-prevNextBtn'
            onClick={onNextTrack}
          />
        </div>

        <TrackBar
          buffered={buffered}
          currentTime={currentTime}
          duration={duration}
        />

        <Icon
          className='Controls-showPlaylist'
          icon='list-numbered'
          onClick={this.openPlayQueue}
        />

        {playQueueOpen &&
          <ClickOutside onClickOutside={this.closePlayQueue}>
            <PlayQueueContainer />
          </ClickOutside>
        }

        <TrackRating
          className='Controls-trackRating'
          track={track}
          onRate={onRateTrack}
        />
      </div>
    )
  }
}
