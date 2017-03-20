import React, {PropTypes} from 'react'

import ItemsList from '../List/withAutoSizer'
import AlbumListHeader from './Header'
import TrackListItem from '../TrackList/Item'
import TrackListSummary from '../TrackList/Summary'

export default function AlbumList (props) {
  const {albums, currentlyPlayingTrackId, onSelectTrack} = props

  const items = albums
    .map((album) => [
      <AlbumListHeader album={album} />,
      ...album.tracks.map((track) => (
        <TrackListItem
          track={track}
          currentlyPlaying={track.id === currentlyPlayingTrackId}
          onSelect={() => onSelectTrack && onSelectTrack(track)}
        />
      )),
    ])
    .reduce((acc, tracks) => acc.concat(tracks), [])

  const allTracks = albums
    .map((album) => album.tracks)
    .reduce((acc, tracks) => acc.concat(tracks), [])

  items.push(
    <TrackListSummary tracks={allTracks} />
  )

  return (
    <ItemsList rowHeight={40} items={items} />
  )
}

AlbumList.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
  currentlyPlayingTrackId: PropTypes.number,
  onSelectTrack: PropTypes.func,
}

AlbumList.defaultProps = {
  albums: [],
}
