import React, {PropTypes} from 'react'
import classNames from 'classnames'

import SquareImage from '../../components/SquareImage'
import Time from '../../components/Time'

export default function PlayQueueItem (props) {
  const {track, isSelected, onClick} = props

  return (
    <li
      className={classNames('PlayQueueItem', {
        'PlayQueueItem-selected': isSelected,
      })}
      onClick={onClick}
    >
      <SquareImage
        className='PlayQueueItem-thumb'
        src={track.parentThumb}
        size={40}
      />
      <div className='PlayQueueItem-text'>
        <div className='PlayQueueItem-title'>
          {track.title}
        </div>
        <div className='PlayQueueItem-artist'>
          {track.grandparentTitle}
        </div>
      </div>
      <Time className='PlayQueueItem-time' duration={track.duration} />
    </li>
  )
}

PlayQueueItem.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
}
