import React, {PropTypes} from 'react'
import Rating from 'react-rating'
import classNames from 'classnames'

import './styles.css'
import Icon from '../Icon'

export default function RatingStars (props) {
  const {className, value, maxValue, onRate} = props

  return (
    <Rating
      className={classNames(className, 'RatingStars')}
      start={0}
      stop={maxValue / 2}
      initialRate={value / 2}
      fractions={2}
      onChange={(nextValue) => onRate(nextValue * 2)}
      empty={<Icon icon='star' className='RatingStars-empty' />}
      full={<Icon icon='star' className='RatingStars-full' />}
    />
  )
}

RatingStars.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onRate: PropTypes.func.isRequired,
}

RatingStars.defaultProps = {
  value: 0,
  maxValue: 10,
}
