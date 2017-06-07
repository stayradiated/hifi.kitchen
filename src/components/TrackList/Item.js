import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'
import {ContextMenuTrigger} from 'react-contextmenu'

import './Item.css'

import {PLAYER_STATE_PAUSED} from '../../stores/constants'
import {TRACK_CONTEXT_MENU} from '../ContextMenu/Track'
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
    <ContextMenuTrigger
      id={TRACK_CONTEXT_MENU}
      track={track}
      collect={(p) => p}
    >
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
            {displayArtist != null && displayArtist !== track.originalTitle &&
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
    </ContextMenuTrigger>
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
  displayArtist: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  playerState: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
}

export default withHandlers({
  onRate: handleRate,
  onSelect: handleSelect,
})(TrackListItem)
