import React, {PropTypes} from 'react'
import moment from 'moment'

export default function Time (props) {
  const {duration, format, ...otherProps} = props

  return (
    <div {...otherProps}>
      {moment.utc(duration).format(format)}
    </div>
  )
}

Time.propTypes = {
  format: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
}

Time.defaultProps = {
  format: 'm:ss',
}
