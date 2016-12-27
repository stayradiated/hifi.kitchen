import React, {PropTypes} from 'react'
import Rating from 'react-rating'
import classNames from 'classnames'

import './styles.css'

export default function TrackRating (props) {
  const {className, track, onRate} = props

  return (
    <Rating
      className={classNames(className, 'TrackRating')}
      start={0}
      stop={5}
      initialRate={track.userRating / 2}
      fractions={2}
      onChange={(rating) => onRate(track, rating * 2)}
      empty={<span className='icon icon-star TrackRating-empty' />}
      full={<span className='icon icon-star TrackRating-full' />}
    />
  )
}

TrackRating.propTypes = {
  className: PropTypes.string,
  track: PropTypes.shape({}),
  onRate: PropTypes.func.isRequired,
}

TrackRating.defaultProps = {
  rating: 0,
}
