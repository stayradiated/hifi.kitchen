import React, {PropTypes} from 'react'
import classNames from 'classnames'

import './fontello.css'

export default function Icon (props) {
  const {className, icon, ...otherProps} = props

  const classes = classNames(
    className,
    'icon',
    `icon-${icon}`,
  )

  return (
    <div className={classes} {...otherProps} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
}
