import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'

import './styles.css'

import { ALBUM, ARTIST } from '@stayradiated/hifi-redux'

import Icon from '../Icon'
import BlurImage from '../BlurImage'
import Timeline from '../Timeline'
import SquareImage from '../SquareImage'
import RatingStars from '../RatingStars'

const handleGoToAlbum = (props) => () => {
  const { track, onNavigate } = props
  onNavigate(ALBUM, track.parentId)
}

const handleGoToArtist = (props) => () => {
  const { track, onNavigate } = props
  onNavigate(ARTIST, track.grandparentId)
}

function Controls (props) {
  const {
    audio, track, paused, shuffled,
    onStop, onPrev, onPlay, onPause, onNext, onPlayer, onRateTrack,
    onShuffle, fullScreenMode, onGoToArtist, onGoToAlbum
  } = props

  return (
    <div className='Controls'>
      {fullScreenMode || <BlurImage src={track.thumb} />}
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
            <button onClick={onGoToAlbum} className='Controls-trackInfo-title'>
              {track.title}
            </button>
            <span className='Controls-trackInfo-seperator'>&mdash;</span>
            <button onClick={onGoToArtist} className='Controls-trackInfo-artist'>
              {track.originalTitle}
            </button>
          </div>
          <div className='Controls-timeline'>
            <button
              onClick={onShuffle}
              className={classNames('Controls-shuffle', {
                'Controls-shuffle_enabled': shuffled
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
    thumb: PropTypes.string
  }).isRequired,
  paused: PropTypes.bool,
  shuffled: PropTypes.bool,
  audio: PropTypes.shape({
    buffered: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number
  }).isRequired,
  fullScreenMode: PropTypes.bool,
  onStop: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPlayer: PropTypes.func.isRequired,
  onShuffle: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,
  onGoToArtist: PropTypes.func.isRequired,
  onGoToAlbum: PropTypes.func.isRequired
}

export default compose(
  setPropTypes({
    onNavigate: PropTypes.func.isRequired
  }),
  withHandlers({
    onGoToArtist: handleGoToArtist,
    onGoToAlbum: handleGoToAlbum
  })
)(Controls)
