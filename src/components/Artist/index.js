import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './styles.css'

import SquareImage from '../SquareImage'

export default function Artist (props) {
  const {artist, ...otherProps} = props

  return (
    <Link {...otherProps} to={`/library/1/artists/${artist.id}`} className='Artist'>
      <SquareImage
        className='Artist-image'
        src={artist.thumb}
        alt={artist.title}
        size={140}
      />
      <div className='Artist-text'>
        <h2 className='Artist-title'>{artist.title}</h2>
        <h3 className='Artist-artist'>{artist.country && artist.country[0]}</h3>
      </div>
    </Link>
  )
}

Artist.propTypes = {
  artist: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
  }).isRequired,
}
