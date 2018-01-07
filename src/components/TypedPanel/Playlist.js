import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import withHandlers from 'recompose/withHandlers'

import { PLAYLIST } from '@stayradiated/hifi-redux'

import Panel from '../Panel'
import PlaylistItemList from '../PlaylistItemList'

const handleSelectTrack = (props) => (track) => {
  const { playlist, onCreateQueue } = props
  onCreateQueue(PLAYLIST, playlist.id, track.id)
}

const handleSort = (props) => ({ newIndex, oldIndex }) => {
  const { playlist, onMovePlaylistItem } = props
  onMovePlaylistItem({
    playlistId: playlist.id,
    newIndex,
    oldIndex
  })
}

function PlaylistPanel (props) {
  const {
    playlist, values, currentlyPlayingTrackId, playerState,
    onSelectTrack, onLoadItems, onRateTrack, onSort,
    ...otherProps
  } = props

  const details = {
    thumb: playlist.composite,
    title: playlist.title,
    subtitle: playlist.smart ? 'Smart Playlist' : 'Playlist',
    meta: `${playlist.leafCount} items`
  }

  const playlistItems = values.playlistItems.get(playlist.id) || []

  return (
    <Panel {...otherProps} details={details}>
      <PlaylistItemList
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        onLoadItems={onLoadItems}
        onRateTrack={onRateTrack}
        onSelectTrack={onSelectTrack}
        onSort={onSort}
        playerState={playerState}
        playlistItems={playlistItems}
        values={values}
      />
    </Panel>
  )
}

PlaylistPanel.propTypes = {
  currentlyPlayingTrackId: PropTypes.number,
  onLoadItems: PropTypes.func,
  onMovePlaylistItem: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func,
  onSelectTrack: PropTypes.func,
  playerState: PropTypes.string,
  playlist: PropTypes.shape({
    tracks: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  values: PropTypes.shape({
    playlistTracks: PropTypes.instanceOf(Map),
    tracks: PropTypes.instanceOf(Map)
  }).isRequired
}

export default compose(
  setPropTypes({
    onCreateQueue: PropTypes.func.isRequired
  }),
  withHandlers({
    onSelectTrack: handleSelectTrack,
    onSort: handleSort
  })
)(PlaylistPanel)
