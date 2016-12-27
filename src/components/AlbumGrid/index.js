import React, {PropTypes} from 'react'

import Album from '../Album'
import AlbumContainer from '../../containers/Album'
import MagicGrid from '../MagicGrid'

export default function AlbumGrid (props) {
  const {albums, albumId, librarySectionId} = props

  const items = albums.map((album) => ({
    id: album.id,
    element: <Album album={album} />,
  }))

  return (
    <MagicGrid
      items={items}
      itemWidth={150}
      component={<AlbumContainer librarySectionId={librarySectionId} />}
      propName='albumId'
      currentId={albumId}
    />
  )
}

AlbumGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  albumId: PropTypes.number,
  librarySectionId: PropTypes.number,
}
