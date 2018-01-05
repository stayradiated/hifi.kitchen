import React from 'react'
import PropTypes from 'prop-types'
import Rating from 'react-rating'
import classNames from 'classnames'

import './styles.css'
import Icon from '../Icon'

export default function RatingStars (props) {
  const { className, value, maxValue, onRate } = props

  return (
    <Rating
      className={classNames(className, 'RatingStars')}
      start={0}
      stop={maxValue / 2}
      initialRating={value / 2}
      fractions={2}
      onChange={(nextValue) => onRate(nextValue * 2)}
      emptySymbol={<Icon icon='star' className='RatingStars-empty' />}
      fullSymbol={<Icon icon='star' className='RatingStars-full' />}
    />
  )
}

RatingStars.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  onRate: PropTypes.func.isRequired
}

RatingStars.defaultProps = {
  value: 0,
  maxValue: 10
}
