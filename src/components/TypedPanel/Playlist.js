import React, {PropTypes} from 'react'

import Panel from '../Panel'
import TrackList from '../TrackList'

export default function PlaylistPanel (props) {
  const {
    playlist, values, currentlyPlayingTrackId, playerState,
    onSelectTrack, onLoadItems, onRateTrack,
    ...otherProps
  } = props

  const details = {
    thumb: playlist.composite,
    title: playlist.title,
    subtitle: 'Playlist',
    meta: `${playlist.leafCount} items`,
  }

  const playlistTracks = values.playlistTracks.get(playlist.id) || []

  return (
    <Panel {...otherProps} details={details}>
      <TrackList
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        displayArtist
        onLoadItems={onLoadItems}
        onRateTrack={onRateTrack}
        onSelectTrack={onSelectTrack}
        playerState={playerState}
        trackIds={playlistTracks}
        values={values}
      />
    </Panel>
  )
}

PlaylistPanel.propTypes = {
  currentlyPlayingTrackId: PropTypes.number,
  onLoadItems: PropTypes.func,
  onRateTrack: PropTypes.func,
  onSelectTrack: PropTypes.func,
  playerState: PropTypes.string,
  playlist: PropTypes.shape({
    tracks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  values: PropTypes.shape({
    playlistTracks: PropTypes.instanceOf(Map),
    tracks: PropTypes.instanceOf(Map),
  }).isRequired,
}
