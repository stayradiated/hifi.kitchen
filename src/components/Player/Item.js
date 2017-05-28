import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {SortableElement} from 'react-sortable-hoc'

import './Item.css'

import SortHandle from '../SortHandle'
import Time from '../Time'

const PlayerItem = (props) => {
  const {style, track, isSelected, onClick} = props

  return (
    <button
      style={style}
      className={classNames('PlayerItem', {
        'PlayerItem-selected': isSelected,
      })}
      onClick={onClick}
    >
      <div className='PlayerItem-text'>
        <div className='PlayerItem-title'>
          {track.title}
        </div>
        <div className='PlayerItem-artist'>
          {track.grandparentTitle}
        </div>
      </div>
      <Time
        className='PlayerItem-time'
        value={track.duration}
      />
      <SortHandle />
    </button>
  )
}

PlayerItem.propTypes = {
  style: PropTypes.shape({}),
  track: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
}

export default new SortableElement(PlayerItem)
