import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withState from 'recompose/withState'
import setPropTypes from 'recompose/setPropTypes'

import './styles.css'

const handleClick = () => (event) => {
  event.stopPropagation()
}

const handleMouseDown = (props) => () => {
  const { hover, onRate } = props
  onRate(hover + 1) // remember hover is zero-indexed
}

const handleMouseOver = (props) => (event) => {
  const { setHover } = props
  const key = event.target.getAttribute('data-key')
  const index = parseInt(key, 10)
  if (isNaN(index) === false) {
    setHover(index)
  }
}

const handleMouseLeave = (props) => () => {
  const { setHover } = props
  setHover(null)
}

function RatingBars (props) {
  const {
    className, style, value, maxValue, hover,
    onClick, onMouseDown, onMouseOver, onMouseLeave
  } = props

  const bars = []

  const width = `calc(${100 / maxValue}% - 1px)`

  for (let i = 0; i < maxValue; i += 1) {
    bars.push(
      <div
        key={i}
        data-key={i}
        style={{ width }}
        className={classNames('RatingBars-bar', {
          'RatingBars-bar-active': i < value,
          'RatingBars-bar-hover': hover != null && i <= hover
        })}
      />
    )
  }

  return (
    <div
      style={style}
      className={classNames(className, 'RatingBars')}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {bars}
    </div>
  )
}

RatingBars.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
  value: PropTypes.number,
  maxValue: PropTypes.number,
  hover: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
}

RatingBars.defaultProps = {
  value: 0,
  maxValue: 5
}

export default compose(
  setPropTypes({
    onRate: PropTypes.func.isRequired
  }),
  withState('hover', 'setHover', null),
  withHandlers({
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave
  })
)(RatingBars)
