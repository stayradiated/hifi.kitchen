import React, {PropTypes} from 'react'

import './styles.css'

import Duration from '../Duration'

export default function TrackBar (props) {
  const {buffered, currentTime, duration} = props

  return (
    <div className='TrackBar'>
      <div className='TrackBar-timestamp TrackBar-currentTime'>
        <Duration time={currentTime} />
      </div>
      <div className='TrackBar-track'>
        <div
          className='TrackBar-trackBar TrackBar-trackBuffered'
          style={{width: `${(buffered / duration) * 100}%`}}
        />
        <div
          className='TrackBar-trackBar TrackBar-trackCurrentTime'
          style={{width: `${(currentTime / duration) * 100}%`}}
        />
      </div>
      <div className='TrackBar-timestamp TrackBar-duration'>
        <Duration time={duration} />
      </div>
    </div>
  )
}

TrackBar.propTypes = {
  buffered: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
}
