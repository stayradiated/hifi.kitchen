import React, {PropTypes} from 'react'

import Panel from '../Panel'
import AlbumList from '../AlbumList'

export default function ArtistPanel (props) {
  const {
    artist, values,
    currentlyPlayingTrackId, onSelectTrack,
    ...otherProps
  } = props

  const details = {
    thumb: artist.thumb,
    title: artist.title,
    subtitle: artist.genre.join(', '),
    meta: artist.country.join(', '),
  }

  const artistAlbums = values.artistAlbums.get(artist.id) || []
  const albums = artistAlbums.map((albumId) => {
    const album = values.albums.get(albumId)
    const trackIds = values.albumTracks.get(albumId) || []
    const tracks = trackIds.map((id) => values.tracks.get(id))

    return {
      ...album,
      tracks,
    }
  })

  return (
    <Panel {...otherProps} details={details}>
      <AlbumList
        albums={albums}
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        onSelectTrack={onSelectTrack}
        preserveTrackIndex
      />
    </Panel>
  )
}

ArtistPanel.propTypes = {
  values: PropTypes.shape({
    artistAlbums: PropTypes.instanceOf(Map),
    albums: PropTypes.instanceOf(Map),
  }).isRequired,
  artist: PropTypes.shape({
    albums: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currentlyPlayingTrackId: PropTypes.number,
  onSelectTrack: PropTypes.func,
}
