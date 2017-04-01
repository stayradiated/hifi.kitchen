import React, {PropTypes} from 'react'
import withHandlers from 'recompose/withHandlers'

import './Item.css'

import {PLAYER_STATE_PAUSED} from '../../stores/constants'
import Time from '../Time'
import RatingBars from '../RatingBars'
import SoundBars from '../SoundBars'

const handleRate = (props) => (rating) => {
  const {track, onRate} = props
  onRate(track.id, rating)
}

const handleSelect = (props) => () => {
  const {track, onSelect} = props
  onSelect(track)
}

function TrackListItem (props) {
  const {
    index, track, style, currentlyPlaying, displayArtist, playerState,
    onSelect, onRate,
  } = props

  return (
    <button className='TrackListItem' style={style} onClick={onSelect}>
      <div className='TrackListItem-contents'>
        {currentlyPlaying
          ? <span className='TrackListItem-nowPlayingIcon'>
            <SoundBars paused={playerState === PLAYER_STATE_PAUSED} />
          </span>
          : <span className='TrackListItem-index'>
            {index != null ? index : track.index}
          </span>}
        <span className='TrackListItem-fulltitle'>
          <span className='TrackListItem-title'>{track.title}</span>
          {displayArtist &&
            <span className='TrackListItem-artist'>{track.originalTitle}</span>}
        </span>
        <RatingBars
          className='TrackListItem-rating'
          value={track.userRating}
          maxValue={10}
          onRate={onRate}
        />
        <Time
          className='TrackListItem-duration'
          value={track.duration}
        />
      </div>
    </button>
  )
}

TrackListItem.propTypes = {
  style: PropTypes.shape({}),
  index: PropTypes.number,
  track: PropTypes.shape({
    index: PropTypes.number,
    title: PropTypes.string,
    userRating: PropTypes.nuumber,
    duration: PropTypes.nuumber,
  }).isRequired,
  currentlyPlaying: PropTypes.bool,
  displayArtist: PropTypes.bool,
  playerState: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
}

export default withHandlers({
  onRate: handleRate,
  onSelect: handleSelect,
})(TrackListItem)
