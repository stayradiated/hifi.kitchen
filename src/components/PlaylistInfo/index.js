import React, {PropTypes} from 'react'

import './styles.css'

import TrackList from '../TrackList'
import SquareImage from '../SquareImage'

export default function PlaylistInfo (props) {
  const {
    playlist, playlistTracks, onSelectTrack, onPlexMix, onRateTrack,
  } = props

  return (
    <div className='PlaylistInfo' >
      <SquareImage
        className='PlaylistInfo-image'
        src={playlist.composite}
        alt={playlist.title}
        size={300}
      />

      <div className='PlaylistInfo-details'>
        <h2 className='PlaylistInfo-title'>{playlist.title}</h2>
        <div className='PlaylistInfo-row2'>
          <h2 className='PlaylistInfo-artist'>{playlist.parentTitle}</h2>
          <h2 className='PlaylistInfo-year'>{playlist.year}</h2>
        </div>
        <TrackList
          tracks={playlistTracks}
          onSelect={onSelectTrack}
          onPlexMix={onPlexMix}
          onRate={onRateTrack}
          displayArtist
        />
      </div>
    </div>
  )
}

PlaylistInfo.propTypes = {
  playlist: PropTypes.shape({}).isRequired,
  playlistTracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectTrack: PropTypes.func,
  onPlexMix: PropTypes.func,
  onRateTrack: PropTypes.func,
}
