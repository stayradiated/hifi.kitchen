import React, {PropTypes} from 'react'

import Panel from '../Panel'
import TrackList from '../TrackList'

export default function AlbumPanel (props) {
  const {
    album, values, currentlyPlayingTrackId,
    onSelectTrack, onRateTrack, onLoadItems,
    ...otherProps
  } = props

  const details = {
    thumb: album.thumb,
    title: album.title,
    subtitle: album.parentTitle,
    meta: album.year != null ? album.year.toString() : '',
  }

  const albumTracks = values.albumTracks.get(album.id) || []

  return (
    <Panel {...otherProps} details={details}>
      <TrackList
        trackIds={albumTracks}
        values={values}
        preserveTrackIndex
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        onLoadItems={onLoadItems}
        onRateTrack={onRateTrack}
        onSelectTrack={onSelectTrack}
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
  onLoadItems: PropTypes.func.isRequired,
}
