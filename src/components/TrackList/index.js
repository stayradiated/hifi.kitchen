import React, {PropTypes} from 'react'

import ItemsList from '../List/withAutoSizer'
import TrackListItem from './Item'
import TrackListSummary from './Summary'

export default function TrackList (props) {
  const {
    tracks, preserveTrackIndex,
    onRateTrack, onSelectTrack,
    currentlyPlayingTrackId, displayArtist,
  } = props

  const items = tracks.map((track, index) => {
    return (
      <TrackListItem
        track={track}
        index={preserveTrackIndex ? track.index : index + 1}
        currentlyPlaying={track.id === currentlyPlayingTrackId}
        onRate={onRateTrack}
        onSelect={onSelectTrack}
        displayArtist={displayArtist}
      />
    )
  })

  items.push(
    <TrackListSummary tracks={tracks} />
  )

  return (
    <ItemsList rowHeight={40} items={items} />
  )
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  preserveTrackIndex: PropTypes.bool,
  currentlyPlayingTrackId: PropTypes.number,
  displayArtist: PropTypes.bool,
  onRateTrack: PropTypes.func.isRequired,
  onSelectTrack: PropTypes.func.isRequired,
}

TrackList.defaultProps = {
  tracks: [],
}
