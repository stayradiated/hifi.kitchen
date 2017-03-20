import React, {PropTypes} from 'react'

import './styles.css'

import Time from '../Time'

export default function Timeline (props) {
  const {buffered, currentTime, duration} = props

  return (
    <div className='Timeline'>
      <div className='Timeline-timestamp Timeline-currentTime'>
        <Time value={currentTime} unit='s' trim={false} />
      </div>
      <div className='Timeline-track'>
        <div
          className='Timeline-trackBar Timeline-trackBuffered'
          style={{width: `${(buffered / duration) * 100}%`}}
        />
        <div
          className='Timeline-trackBar Timeline-trackCurrentTime'
          style={{width: `${(currentTime / duration) * 100}%`}}
        />
      </div>
      <div className='Timeline-timestamp Timeline-duration'>
        <Time value={duration} unit='s' trim={false} />
      </div>
    </div>
  )
}

Timeline.propTypes = {
  buffered: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
}
