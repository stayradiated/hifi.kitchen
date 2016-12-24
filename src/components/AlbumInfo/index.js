import React, {PropTypes} from 'react'

import './styles.css'

import TrackList from '../TrackList'
import SquareImage from '../SquareImage'
import Image from '../Image'

export default function AlbumInfo (props) {
  const {album, albumTracks} = props

  return (
    <div className='AlbumInfo' >
      <Image
        className='AlbumInfo-background'
        src={album.thumb}
        width={150}
        height={150}
      />

      <SquareImage
        className='AlbumInfo-image'
        src={album.thumb}
        alt={album.title}
        size={300}
      />

      <div className='AlbumInfo-details'>
        <h2 className='AlbumInfo-title'>{album.title}</h2>
        <div className='AlbumInfo-row2'>
          <h2 className='AlbumInfo-artist'>{album.parentTitle}</h2>
          <h2 className='AlbumInfo-year'>{album.year}</h2>
        </div>
        <p className='AlbumInfo-genre'>{album.genre}</p>
        <TrackList tracks={albumTracks} />
      </div>
    </div>
  )
}

AlbumInfo.propTypes = {
  album: PropTypes.shape({}).isRequired,
  albumTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
}
