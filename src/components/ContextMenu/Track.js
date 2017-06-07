import React from 'react'
import PropTypes from 'prop-types'
import {ContextMenu, MenuItem, connectMenu} from 'react-contextmenu'

export const TRACK_CONTEXT_MENU = 'TRACK_CONTEXT_MENU'

const TrackContextMenu = (props) => {
  const {id, trigger} = props
  const track = (trigger && trigger.track) || {}
  console.log({track})

  return (
    <ContextMenu id={id}>
      <MenuItem>Play Next</MenuItem>
      <MenuItem>Add to Queue</MenuItem>
      <MenuItem>Play Plex Mix</MenuItem>
      <MenuItem>Add to Playlist...</MenuItem>
    </ContextMenu>
  )
}

TrackContextMenu.propTypes = {
  id: PropTypes.string.isRequired,
  trigger: PropTypes.shape({
    track: PropTypes.shape({}).isRequired,
  }),
}

export default connectMenu(TRACK_CONTEXT_MENU)(TrackContextMenu)
