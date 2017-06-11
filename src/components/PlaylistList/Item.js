import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'

import './Item.css'

import SquareImage from '../SquareImage'

const handleSelect = (props) => () => {
  const {playlist, onSelect} = props
  onSelect(playlist)
}

function PlaylistListItem (props) {
  const {playlist, style, onSelect} = props

  return (
    <button className='PlaylistListItem' style={style} onClick={onSelect}>
      <div className='PlaylistListItem-contents'>
        <SquareImage
          className='PlaylistListItem-image'
          src={playlist.composite}
          alt={playlist.title}
          size={100}
          quality={50}
        />
        <span className='PlaylistListItem-title'>{playlist.title}</span>
      </div>
    </button>
  )
}

PlaylistListItem.propTypes = {
  style: PropTypes.shape({}),
  playlist: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default withHandlers({
  onSelect: handleSelect,
})(PlaylistListItem)
