import React, {PropTypes} from 'react'

import './styles.css'

import PlayQueueItem from './Item'

export default function PlayQueue (props) {
  const {selectedIndex, tracks, onSelectTrack} = props

  return (
    <div className='PlayQueue'>
      <ul className='PlayQueue-list'>
        {tracks.map((track, i) => (
          <PlayQueueItem
            key={i}
            track={track}
            isSelected={selectedIndex === i}
            onClick={() => onSelectTrack(track, i)}
          />
        ))}
      </ul>
    </div>
  )
}

PlayQueue.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onSelectTrack: PropTypes.func.isRequired,
}
