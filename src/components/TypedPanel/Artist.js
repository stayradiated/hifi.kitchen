import React, {PropTypes} from 'react'

import Panel from '../Panel'
import AlbumList from '../AlbumList'

export default function ArtistPanel (props) {
  const {
    artist, values, currentlyPlayingTrackId,
    onSelectTrack, onRateTrack, onLoadItems,
    ...otherProps
  } = props

  const details = {
    thumb: artist.thumb,
    title: artist.title,
    subtitle: artist.genre.join(', '),
    meta: artist.country.join(', '),
  }

  const albumIds = values.artistAlbums.get(artist.id) || []

  return (
    <Panel {...otherProps} details={details}>
      <AlbumList
        albumIds={albumIds}
        values={values}
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        preserveTrackIndex
        onLoadItems={onLoadItems}
        onRateTrack={onRateTrack}
        onSelectTrack={onSelectTrack}
      />
    </Panel>
  )
}

ArtistPanel.propTypes = {
  values: PropTypes.shape({
    artistAlbums: PropTypes.instanceOf(Map),
  }).isRequired,
  artist: PropTypes.shape({
    albums: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currentlyPlayingTrackId: PropTypes.number,
  onSelectTrack: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,
  onLoadItems: PropTypes.func.isRequired,
}
