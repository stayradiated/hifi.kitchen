import React, {PropTypes} from 'react'

import './Summary.css'

import Time from '../Time'

export default function Summary (props) {
  const {tracks, style} = props

  const totalDuration = tracks.reduce((total, track) => {
    return track.duration + total
  }, 0)

  return (
    <div className='TrackListSummary' style={style}>
      Tracks: {tracks.length}, Total Time: <Time
        value={totalDuration}
        format='h [h] m [min] ss [sec]'
      />
    </div>
  )
}

Summary.propTypes = {
  style: PropTypes.shape({}),
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
}
