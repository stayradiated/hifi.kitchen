import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'
import { ContextMenuTrigger } from 'react-contextmenu'

import './Item.css'

import { TRACK_CONTEXT_MENU } from '../ContextMenu/Track'
import Time from '../Time'
import RatingBars from '../RatingBars'
import TrackListItemHandle from './ItemHandle'

const handleRate = (props) => (rating) => {
  const { track, onRate } = props
  onRate(track.id, rating)
}

const handleSelect = (props) => () => {
  const { track, onSelect } = props
  onSelect(track)
}

function TrackListItem (props) {
  const {
    context, track, style, displayArtist, relativeTrackStartTime,
    onSelect, onRate, onClickTime
  } = props

  return (
    <ContextMenuTrigger
      renderTag='button'
      attributes={{
        className: 'TrackListItem',
        style,
        onClick: onSelect
      }}
      id={TRACK_CONTEXT_MENU}
      context={context}
      track={track}
      collect={(p) => p}
    >
      <div className='TrackListItem-contents'>
        <TrackListItemHandle {...props} />
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
          value={relativeTrackStartTime != null
            ? relativeTrackStartTime
            : track.duration}
          onClick={onClickTime}
        />
      </div>
    </ContextMenuTrigger>
  )
}

TrackListItem.propTypes = {
  style: PropTypes.shape({}),
  trackIndex: PropTypes.number,
  context: PropTypes.shape({}),
  track: PropTypes.shape({
    index: PropTypes.number,
    title: PropTypes.string,
    userRating: PropTypes.nuumber,
    duration: PropTypes.nuumber
  }).isRequired,
  relativeTrackStartTime: PropTypes.number,
  currentlyPlaying: PropTypes.bool,
  displayArtist: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  playerState: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
  onClickTime: PropTypes.func
}

export default withHandlers({
  onRate: handleRate,
  onSelect: handleSelect
})(TrackListItem)
