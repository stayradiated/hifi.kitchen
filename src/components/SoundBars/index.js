import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.css'

export default function SoundBars (props) {
  const { paused } = props

  const classes = classNames('SoundBars', {
    'SoundBars-paused': paused
  })

  return (
    <div className={classes}>
      <div className='SoundBars-bar' />
      <div className='SoundBars-bar' />
      <div className='SoundBars-bar' />
      <div className='SoundBars-bar' />
    </div>
  )
}

SoundBars.propTypes = {
  paused: PropTypes.bool
}
