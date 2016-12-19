import React, {PropTypes} from 'react'

import './styles.css'

import Album from '../Album'

export default function AlbumGrid (props) {
  const {albums, onSelect} = props

  return (
    <div className='AlbumGrid'>
      {albums.map((album, i) => (
        <div key={i} className='AlbumGrid-album'>
          <Album
            album={album}
            onClick={() => onSelect(album)}
          />
        </div>
      ))}
    </div>
  )
}

AlbumGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
}
