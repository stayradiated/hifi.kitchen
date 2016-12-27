import React, {PropTypes} from 'react'

import './styles.css'

import Track from '../Track'

export default function TrackList (props) {
  const {tracks, onSelect, onRate} = props

  return (
    <div className='TrackList'>
      {tracks.map((track, i) => (
        <div key={i} className='TrackList-track'>
          <Track
            track={track}
            onSelect={onSelect}
            onRate={onRate}
          />
        </div>
      ))}
    </div>
  )
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func,
  onRate: PropTypes.func,
}
