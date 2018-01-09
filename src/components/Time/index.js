import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'moment-duration-format'

export default function Time (props) {
  const { value, unit, format, trim, stopTrim, ...otherProps } = props

  const formattedTime = moment.duration(value, unit)
    .format(format, { trim, stopTrim })

  return (
    <span {...otherProps}>
      { formattedTime }
    </span>
  )
}

Time.propTypes = {
  format: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
  trim: PropTypes.bool.isRequired,
  stopTrim: PropTypes.string
}

Time.defaultProps = {
  format: 'h:mm:ss',
  unit: 'ms',
  trim: true,
  stopTrim: 'mm'
}
