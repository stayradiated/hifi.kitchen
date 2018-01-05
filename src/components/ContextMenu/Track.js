import React from 'react'
import PropTypes from 'prop-types'
import { ContextMenu, MenuItem, connectMenu } from 'react-contextmenu'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'

import { ARTIST, ALBUM } from '@stayradiated/hifi-redux'

export const TRACK_CONTEXT_MENU = 'TRACK_CONTEXT_MENU'

const handleAddTrackToPlaylist = (props) => () => {
  const { trigger, onAddTrackToPlaylist } = props
  const track = (trigger && trigger.track) || {}
  onAddTrackToPlaylist(track.id)
}

const handleRemoveTrackFromPlaylist = (props) => () => {
  const { trigger, onRemoveItemFromPlaylist } = props
  const context = (trigger && trigger.context)
  const playlistItem = (context && context.playlistItem)
  if (playlistItem != null) {
    onRemoveItemFromPlaylist(playlistItem.id, playlistItem.playlistId)
  }
}

const handleGoToAlbum = (props) => () => {
  const { trigger, onNavigate } = props
  const track = (trigger && trigger.track) || {}
  onNavigate(ALBUM, track.parentId)
}

const handleGoToArtist = (props) => () => {
  const { trigger, onNavigate } = props
  const track = (trigger && trigger.track) || {}
  onNavigate(ARTIST, track.grandparentId)
}

const TrackContextMenu = (props) => {
  const {
    id, trigger,
    onGoToArtist, onGoToAlbum, onAddTrackToPlaylist, onRemoveItemFromPlaylist
  } = props

  return (
    <ContextMenu id={id}>
      <MenuItem onClick={onGoToAlbum}>Go to Album</MenuItem>
      <MenuItem onClick={onGoToArtist}>Go to Artist</MenuItem>
      {/* <MenuItem>Play Next</MenuItem> */}
      {/* <MenuItem>Add to Queue</MenuItem> */}
      {/* <MenuItem>Play Plex Mix</MenuItem> */}
      <MenuItem onClick={onAddTrackToPlaylist}>Add to Playlist...</MenuItem>
      {trigger && trigger.context && trigger.context.playlistItem && (
        <MenuItem onClick={onRemoveItemFromPlaylist}>Remove from Playlist</MenuItem>
      )}
    </ContextMenu>
  )
}

TrackContextMenu.propTypes = {
  id: PropTypes.string.isRequired,
  onAddTrackToPlaylist: PropTypes.func.isRequired,
  onRemoveItemFromPlaylist: PropTypes.func.isRequired,
  onGoToAlbum: PropTypes.func.isRequired,
  onGoToArtist: PropTypes.func.isRequired
}

export default compose(
  connectMenu(TRACK_CONTEXT_MENU),
  setPropTypes({
    onNavigate: PropTypes.func.isRequired,
    trigger: PropTypes.shape({
      track: PropTypes.shape({}).isRequired
    })
  }),
  withHandlers({
    onAddTrackToPlaylist: handleAddTrackToPlaylist,
    onRemoveItemFromPlaylist: handleRemoveTrackFromPlaylist,
    onGoToArtist: handleGoToArtist,
    onGoToAlbum: handleGoToAlbum
  })
)(TrackContextMenu)
