import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import nl2br from 'react-nl2br'

import './styles.css'

import SquareImage from '../SquareImage'

export default function ArtistInfo (props) {
  const {
    artist,
  } = props

  return (
    <div className='ArtistInfo' >
      <SquareImage
        className='ArtistInfo-image'
        src={artist.thumb}
        alt={artist.title}
        size={300}
      />

      <div className='ArtistInfo-details'>
        <h2 className='ArtistInfo-title'>{artist.title}</h2>
        <div className='ArtistInfo-row2'>
          <h2 className='ArtistInfo-artist'>{artist.country && artist.country[0]}</h2>
          <ul className='ArtistInfo-genreList'>
            {artist.genre.map((genre, i) => (
              <li className='ArtistInfo-genreItem' key={i}>
                {!!i && ', '}
                <Link
                  className='ArtistInfo-genreLink'
                  to={`/genre/${genre}`}
                >
                  {genre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className='ArtistInfo-summary'>{nl2br(artist.summary)}</p>
      </div>
    </div>
  )
}

ArtistInfo.propTypes = {
  artist: PropTypes.shape({}).isRequired,
}
