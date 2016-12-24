import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './styles.css'

import SquareImage from '../SquareImage'

export default function Album (props) {
  const {album, ...otherProps} = props

  return (
    <Link {...otherProps} to={`/albums/${album.id}`} className='Album'>
      <SquareImage
        className='Album-image'
        src={album.thumb}
        alt={album.title}
        size={300}
      />
      <h2 className='Album-title'>{album.title}</h2>
      <h3 className='Album-artist'>{album.parentTitle}</h3>
    </Link>
  )
}

Album.propTypes = {
  album: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
  }).isRequired,
}
