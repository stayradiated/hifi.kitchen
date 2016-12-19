import React, {PropTypes} from 'react'

import './styles.css'

export default function Album (props) {
  const {album, ...otherProps} = props

  return (
    <div {...otherProps} className='Album'>
      <img
        src={album.thumb.transcode()}
        alt={album.title}
        className='Album-image'
      />
      <h2 className='Album-title'>{album.title}</h2>
      <h3 className='Album-artist'>{album.parentTitle}</h3>
    </div>
  )
}

Album.propTypes = {
  album: PropTypes.shape({
    thumb: PropTypes.object,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
  }).isRequired,
}
