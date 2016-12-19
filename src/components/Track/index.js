import React, {PropTypes} from 'react'
import StarRating from 'react-star-rating-component'

import './styles.css'

export default function Track (props) {
  const {track} = props

  return (
    <div className='Track'>
      <div className='Track-index'>{track.index}</div>
      <div className='Track-title'>{track.title}</div>
      <div className='Track-duration'>{track.formatTime()}</div>
      <StarRating
        name='react-user-rating'
        value={track.userRating}
        starCount={10}
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
}
