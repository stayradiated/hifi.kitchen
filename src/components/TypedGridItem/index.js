import React, {PropTypes} from 'react'

import Typed from '../Typed'
import ArtistItem from './Artist'
import AlbumItem from './Album'
import PlaylistItem from './Playlist'
import TrackItem from './Track'

export default function TypedGridItem (props) {
  const {item, ...otherProps} = props

  return (
    <Typed
      item={item}
      components={{
        artist: (artist) => <ArtistItem {...otherProps} artist={artist} />,
        album: (album) => <AlbumItem {...otherProps} album={album} />,
        playlist: (playlist) => <PlaylistItem {...otherProps} playlist={playlist} />,
        track: (track) => <TrackItem {...otherProps} track={track} />,
      }}
    />
  )
}

TypedGridItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
}
