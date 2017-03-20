import React, {PropTypes} from 'react'

import Panel from '../Panel'
import TrackList from '../TrackList'

export default function PlaylistPanel (props) {
  const {
    playlist, values,
    currentlyPlayingTrackId, onSelectTrack,
    ...otherProps
  } = props

  const details = {
    thumb: playlist.composite,
    title: playlist.title,
    subtitle: 'Playlist',
    meta: `${playlist.tracks.length} items`,
  }

  const playlistTracks = values.playlistTracks.get(playlist.id) || []
  const tracks = playlistTracks.map((id) => values.tracks.get(id))

  return (
    <Panel {...otherProps} details={details}>
      <TrackList
        tracks={tracks}
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        onSelectTrack={onSelectTrack}
        displayArtist
      />
    </Panel>
  )
}

PlaylistPanel.propTypes = {
  values: PropTypes.shape({
    playlistTracks: PropTypes.instanceOf(Map),
    tracks: PropTypes.instanceOf(Map),
  }).isRequired,
  playlist: PropTypes.shape({
    tracks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currentlyPlayingTrackId: PropTypes.number,
  onSelectTrack: PropTypes.func,
}
