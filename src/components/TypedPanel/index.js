import React, {PropTypes} from 'react'

import Typed from '../Typed'
import AlbumPanel from './Album'
import ArtistPanel from './Artist'
import PlaylistPanel from './Playlist'

export default function TypedPanel (props) {
  const {item, ...otherProps} = props

  return (
    <Typed
      item={item}
      components={{
        album: (album) => <AlbumPanel {...otherProps} album={album} />,
        artist: (artist) => <ArtistPanel {...otherProps} artist={artist} />,
        playlist: (playlist) => <PlaylistPanel {...otherProps} playlist={playlist} />,
      }}
    />
  )
}

TypedPanel.propTypes = {
  item: PropTypes.shape({
    _type: PropTypes.string,
  }).isRequired,
}
