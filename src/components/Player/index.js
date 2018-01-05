import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

import BlurImage from '../BlurImage'
import SquareImage from '../SquareImage'
import PlayerList from './List'

const Player = (props) => {
  const { values, items, selectedTrackId, onChange, onSort, onRateTrack } = props

  const track = values.tracks.get(selectedTrackId)

  if (track == null) {
    return null
  }

  return (
    <div className='Player'>
      <BlurImage src={track.thumb} />
      <div className='Player-currentAlbum'>
        <SquareImage
          className='Player-albumThumb'
          imageClassName='Player-albumThumbImage'
          src={track.thumb}
          size={640}
        />
        <div className='Player-albumTitle'>{track.parentTitle}</div>
        <div className='Player-artistTitle'>{track.grandparentTitle}</div>
      </div>
      <div className='Player-list'>
        <PlayerList
          values={values}
          items={items}
          selectedTrackId={selectedTrackId}
          onChange={onChange}
          onSort={onSort}
          onRateTrack={onRateTrack}
        />
      </div>
    </div>
  )
}

Player.propTypes = {
  values: PropTypes.shape({
    tracks: PropTypes.instanceOf(Map).isRequired
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    track: PropTypes.number.isRequired
  })).isRequired,
  selectedTrackId: PropTypes.number,
  onChange: PropTypes.func,
  onSort: PropTypes.func,
  onRateTrack: PropTypes.func
}

export default Player
