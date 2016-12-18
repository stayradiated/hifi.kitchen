import React, {PropTypes} from 'react'

import './styles.css'

import Album from '../Album'

export default function AlbumGrid (props) {
  const {albums} = props

  return (
    <div className='AlbumGrid'>
      {albums.map((album, i) => (
        <div className='AlbumGrid-album'>
          <Album key={i} album={album} />
        </div>
      ))}
    </div>
  )
}

AlbumGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
}
