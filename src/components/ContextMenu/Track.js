import React from 'react'
import PropTypes from 'prop-types'
import {ContextMenu, MenuItem, connectMenu} from 'react-contextmenu'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'

import {ARTIST, ALBUM} from '../../stores/constants'

export const TRACK_CONTEXT_MENU = 'TRACK_CONTEXT_MENU'

const handleAddTrackToPlaylist = (props) => () => {
  const {trigger, onAddTrackToPlaylist} = props
  const track = (trigger && trigger.track) || {}
  onAddTrackToPlaylist(track.id)
}

const handleGoToAlbum = (props) => () => {
  const {trigger, onNavigate} = props
  const track = (trigger && trigger.track) || {}
  onNavigate(ALBUM, track.parentId)
}

const handleGoToArtist = (props) => () => {
  const {trigger, onNavigate} = props
  const track = (trigger && trigger.track) || {}
  onNavigate(ARTIST, track.grandparentId)
}

const TrackContextMenu = (props) => {
  const {id, onGoToArtist, onGoToAlbum, onAddTrackToPlaylist} = props

  return (
    <ContextMenu id={id}>
      <MenuItem onClick={onGoToAlbum}>Go to Album</MenuItem>
      <MenuItem onClick={onGoToArtist}>Go to Artist</MenuItem>
      {/* <MenuItem>Play Next</MenuItem> */}
      {/* <MenuItem>Add to Queue</MenuItem> */}
      {/* <MenuItem>Play Plex Mix</MenuItem> */}
      <MenuItem onClick={onAddTrackToPlaylist}>Add to Playlist...</MenuItem>
    </ContextMenu>
  )
}

TrackContextMenu.propTypes = {
  id: PropTypes.string.isRequired,
  onAddTrackToPlaylist: PropTypes.func.isRequired,
  onGoToAlbum: PropTypes.func.isRequired,
  onGoToArtist: PropTypes.func.isRequired,
}

export default compose(
  connectMenu(TRACK_CONTEXT_MENU),
  setPropTypes({
    onNavigate: PropTypes.func.isRequired,
    trigger: PropTypes.shape({
      track: PropTypes.shape({}).isRequired,
    }),
  }),
  withHandlers({
    onAddTrackToPlaylist: handleAddTrackToPlaylist,
    onGoToArtist: handleGoToArtist,
    onGoToAlbum: handleGoToAlbum,
  }),
)(TrackContextMenu)
