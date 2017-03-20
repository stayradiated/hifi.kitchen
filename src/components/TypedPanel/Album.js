import React, {PropTypes} from 'react'

import Panel from '../Panel'
import TrackList from '../TrackList'

export default function AlbumPanel (props) {
  const {
    album, values,
    currentlyPlayingTrackId, onSelectTrack, onRateTrack,
    ...otherProps
  } = props

  const details = {
    thumb: album.thumb,
    title: album.title,
    subtitle: album.parentTitle,
    meta: album.year != null ? album.year.toString() : '',
  }

  const albumTracks = values.albumTracks.get(album.id) || []
  const tracks = albumTracks.map((id) => values.tracks.get(id))

  return (
    <Panel {...otherProps} details={details}>
      <TrackList
        tracks={tracks}
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        onSelectTrack={onSelectTrack}
        onRateTrack={onRateTrack}
        preserveTrackIndex
      />
    </Panel>
  )
}

AlbumPanel.propTypes = {
  values: PropTypes.shape({
    albumTracks: PropTypes.instanceOf(Map),
    tracks: PropTypes.instanceOf(Map),
  }).isRequired,
  album: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
    pear: PropTypes.number,
    tracks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currentlyPlayingTrackId: PropTypes.number,
  onSelectTrack: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,
}
