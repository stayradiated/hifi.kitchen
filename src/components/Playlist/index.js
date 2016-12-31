import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './styles.css'

import SquareImage from '../SquareImage'
import Duration from '../Duration'

export default function Playlist (props) {
  const {playlist, ...otherProps} = props

  return (
    <Link {...otherProps} to={`/library/1/playlists/${playlist.id}`} className='Playlist'>
      <SquareImage
        className='Playlist-image'
        src={playlist.composite}
        alt={playlist.title}
        size={140}
      />
      <div className='Playlist-text'>
        <h2 className='Playlist-title'>{playlist.title}</h2>
        <Duration
          className='Playlist-duration'
          time={playlist.duration} ms
          minutesOnly
        /> mins
      </div>
    </Link>
  )
}

Playlist.propTypes = {
  playlist: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
  }).isRequired,
}
