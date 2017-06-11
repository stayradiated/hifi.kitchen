import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

import TrackContextMenu from './Track'

const ContextMenu = (props) => {
  const {onAddTrackToPlaylist, onNavigate} = props

  return (
    <TrackContextMenu
      onAddTrackToPlaylist={onAddTrackToPlaylist}
      onNavigate={onNavigate}
    />
  )
}

ContextMenu.propTypes = {
  onAddTrackToPlaylist: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
}

export default ContextMenu
