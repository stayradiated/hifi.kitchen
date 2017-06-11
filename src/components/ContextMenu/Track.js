import React from 'react'
import PropTypes from 'prop-types'
import {ContextMenu, MenuItem, connectMenu} from 'react-contextmenu'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'

export const TRACK_CONTEXT_MENU = 'TRACK_CONTEXT_MENU'

const handleAddTrackToPlaylist = (props) => () => {
  const {trigger, onAddTrackToPlaylist} = props
  const track = (trigger && trigger.track) || {}
  onAddTrackToPlaylist(track.id)
}

const TrackContextMenu = (props) => {
  const {id, onAddTrackToPlaylist} = props

  return (
    <ContextMenu id={id}>
      <MenuItem>Play Next</MenuItem>
      <MenuItem>Add to Queue</MenuItem>
      <MenuItem>Play Plex Mix</MenuItem>
      <MenuItem onClick={onAddTrackToPlaylist}>Add to Playlist...</MenuItem>
    </ContextMenu>
  )
}

TrackContextMenu.propTypes = {
  id: PropTypes.string.isRequired,
  onAddTrackToPlaylist: PropTypes.func.isRequired,
}

export default compose(
  connectMenu(TRACK_CONTEXT_MENU),
  setPropTypes({
    trigger: PropTypes.shape({
      track: PropTypes.shape({}).isRequired,
    }),
  }),
  withHandlers({
    onAddTrackToPlaylist: handleAddTrackToPlaylist,
  }),
)(TrackContextMenu)
