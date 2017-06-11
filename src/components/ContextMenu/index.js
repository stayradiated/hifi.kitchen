import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

import TrackContextMenu from './Track'

const ContextMenu = (props) => {
  const {onAddTrackToPlaylist} = props

  return (
    <TrackContextMenu
      onAddTrackToPlaylist={onAddTrackToPlaylist}
    />
  )
}

ContextMenu.propTypes = {
  onAddTrackToPlaylist: PropTypes.func.isRequired,
}

export default ContextMenu
