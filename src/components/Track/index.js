import React, {PropTypes} from 'react'
import classNames from 'classnames'

import './styles.css'

import Time from '../Time'
import TrackRating from '../TrackRating'

export default function Track (props) {
  const {track, onSelect, onPlexMix, onRate} = props

  return (
    <div className='Track'>
      <div className='Track-index'>{track.index}</div>
      <div
        className='Track-title'
        onClick={() => onSelect(track)}
      >
        {track.title}
      </div>
      <Time className='Track-duration' duration={track.duration} />
      <TrackRating track={track} onRate={onRate} />
      <button
        className={classNames('Track-plexMix', {
          'Track-plexMixDisabled': !track.plexMix,
        })}
        onClick={() => onPlexMix(track)}
      >
        ~
      </button>
    </div>
  )
}

Track.propTypes = {
  track: PropTypes.shape({
    index: PropTypes.number,
    title: PropTypes.string,
    formatTime: PropTypes.func,
  }).isRequired,
  onRate: PropTypes.func,
  onSelect: PropTypes.func,
  onPlexMix: PropTypes.func,
}
