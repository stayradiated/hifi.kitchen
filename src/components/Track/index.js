import React, {PropTypes} from 'react'
import Rating from 'react-rating'

import './styles.css'

import Time from '../Time'

export default function Track (props) {
  const {track, onSelect, onRate} = props

  return (
    <div className='Track'>
      <div className='Track-index'>{track.index}</div>
      <div className='Track-title' onClick={() => onSelect(track)}>{track.title}</div>
      <Time className='Track-duration' duration={track.duration} />
      <Rating
        start={0}
        stop={5}
        initialRate={track.userRating / 2}
        fractions={2}
        onChange={(rating) => onRate(track, rating * 2)}
        empty={<span className='icon icon-star Track-ratingEmpty' />}
        full={<span className='icon icon-star Track-ratingFull' />}
      />
    </div>
  )
}

Track.propTypes = {
  track: PropTypes.shape({
    index: PropTypes.number,
    title: PropTypes.string,
    formatTime: PropTypes.func,
  }).isRequired,
  onRate: PropTypes.func,
  onSelect: PropTypes.func,
}
