import React, {PropTypes} from 'react'

import './Summary.css'

import Time from '../Time'

export default function Summary (props) {
  const {trackIds, values, style} = props

  const totalDuration = trackIds
    .map((trackId) => values.tracks.get(trackId))
    .filter((track) => track != null)
    .reduce((total, track) => track.duration + total, 0)

  return (
    <div className='TrackListSummary' style={style}>
      Tracks: {trackIds.length}, Total Time: <Time
        value={totalDuration}
        format='h [h] m [min] ss [sec]'
      />
    </div>
  )
}

Summary.propTypes = {
  trackIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  values: PropTypes.shape({
    tracks: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  style: PropTypes.shape({}),
}
