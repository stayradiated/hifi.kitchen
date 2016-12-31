import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './styles.css'

import TrackList from '../TrackList'
import SquareImage from '../SquareImage'

export default function AlbumInfo (props) {
  const {
    album, albumTracks, onSelectTrack, onPlexMix, onRateTrack,
  } = props

  return (
    <div className='AlbumInfo' >
      <SquareImage
        className='AlbumInfo-image'
        src={album.thumb}
        alt={album.title}
        size={300}
      />

      <div className='AlbumInfo-details'>
        <h2 className='AlbumInfo-title'>{album.title}</h2>
        <div className='AlbumInfo-row2'>
          <Link to={`/library/1/artists/${album.parentKey.match(/\d+/)[0]}`} className='AlbumInfo-artist'>{album.parentTitle}</Link>
          <h2 className='AlbumInfo-year'>{album.year}</h2>
        </div>
        <ul className='AlbumInfo-genreList'>
          {album.genre.map((genre, i) => (
            <li className='AlbumInfo-genreItem' key={i}>
              {!!i && ', '}
              <Link
                className='AlbumInfo-genreLink'
                to={`/genre/${genre}`}
              >
                {genre}
              </Link>
            </li>
          ))}
        </ul>
        <TrackList
          tracks={albumTracks}
          onSelect={onSelectTrack}
          onPlexMix={onPlexMix}
          onRate={onRateTrack}
          displayArtist={album.parentTitle === 'Various Artists'}
        />
      </div>
    </div>
  )
}

AlbumInfo.propTypes = {
  album: PropTypes.shape({}).isRequired,
  albumTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectTrack: PropTypes.func,
  onPlexMix: PropTypes.func,
  onRateTrack: PropTypes.func,
}
