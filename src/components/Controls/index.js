import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.css'

import Icon from '../Icon'
import BlurImage from '../BlurImage'
import Timeline from '../Timeline'
import SquareImage from '../SquareImage'
import RatingStars from '../RatingStars'

export default function Controls (props) {
  const {
    audio, track, paused, shuffled,
    onStop, onPrev, onPlay, onPause, onNext, onQueue, onPlayer, onRateTrack,
    onShuffle,
  } = props

  return (
    <div className='Controls'>
      <BlurImage src={track.thumb} />
      <div className='Controls-contents'>
        <div className='Controls-playback'>
          <button onClick={onPrev} className='Controls-playback-prev'>
            <Icon icon='to-start' />
          </button>
          <button
            onClick={paused ? onPlay : onPause}
            className='Controls-playback-play'
          >
            <Icon icon={paused ? 'play' : 'pause'} />
          </button>
          <button onClick={onNext} className='Controls-playback-next'>
            <Icon icon='to-end' />
          </button>
          <button onClick={onStop} className='Controls-playback-stop'>
            <Icon icon='stop' />
          </button>
        </div>
        <div className='Controls-centerBlock'>
          <div className='Controls-trackInfo'>
            <span className='Controls-trackInfo-title'>
              {track.title}
            </span>
            <span className='Controls-trackInfo-seperator'>&mdash;</span>
            <span className='Controls-trackInfo-artist'>
              {track.originalTitle}
            </span>
          </div>
          <div className='Controls-timeline'>
            <button
              onClick={onShuffle}
              className={classNames('Controls-shuffle', {
                'Controls-shuffle_enabled': shuffled,
              })}
            >
              <Icon icon='shuffle' />
            </button>
            <Timeline
              buffered={audio.buffered}
              currentTime={audio.currentTime}
              duration={audio.duration}
            />
            <Icon icon='cw' className='Controls-repeat' />
          </div>
        </div>
        <RatingStars
          className='Controls-rating'
          value={track.userRating || 0}
          maxValue={10}
          onRate={(rating) => onRateTrack(track.id, rating)}
        />
        <button
          className='Controls-queue'
          onClick={onQueue}
        >
          <Icon icon='list' />
        </button>
        <button
          className='Controls-albumThumbButton'
          onClick={onPlayer}
        >
          <SquareImage
            className='Controls-albumThumb'
            imageClassName='Controls-albumThumbImage'
            src={track.thumb}
          />
        </button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string,
    originalTitle: PropTypes.string,
    userRating: PropTypes.number,
    thumb: PropTypes.string,
  }).isRequired,
  paused: PropTypes.bool,
  shuffled: PropTypes.bool,
  audio: PropTypes.shape({
    buffered: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
  }).isRequired,
  onStop: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onQueue: PropTypes.func.isRequired,
  onPlayer: PropTypes.func.isRequired,
  onShuffle: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,
}
