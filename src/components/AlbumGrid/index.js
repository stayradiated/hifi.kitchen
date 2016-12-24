import React, {PropTypes} from 'react'

import './styles.css'

import Album from '../Album'
import AlbumRoute from '../../routes/Album'
import MagicGrid from '../MagicGrid'

export default function AlbumGrid (props) {
  const {albums, albumId} = props

  const items = albums.map((album) => ({
    id: album.id,
    element: <Album album={album} />,
  }))

  return (
    <MagicGrid
      className='AlbumGrid'
      items={items}
      itemWidth={150}
      component={<AlbumRoute />}
      propName='albumId'
      currentId={albumId}
    />
  )
}

AlbumGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  albumId: PropTypes.number,
}
