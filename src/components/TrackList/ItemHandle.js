import React from 'react'
import PropTypes from 'prop-types'
import { PLAYER_STATE_PAUSED } from '@stayradiated/hifi-redux'

import SortHandle from '../SortHandle'
import SoundBars from '../SoundBars'

import './ItemHandle.css'

const IndexOrIcon = (props) => {
  const { playerState, track, trackIndex, currentlyPlaying } = props

  if (currentlyPlaying) {
    return (
      <span className='TrackListItemHandle-nowPlayingIcon'>
        <SoundBars paused={playerState === PLAYER_STATE_PAUSED} />
      </span>
    )
  }

  return (
    <span className='TrackListItemHandle-index'>
      {trackIndex != null ? trackIndex : track.index}
    </span>
  )
}

function TrackListItemHandle (props) {
  const { sortable } = props

  if (!sortable) {
    return (
      <div className='TrackListItemHandle-container'>
        <IndexOrIcon {...props} />
      </div>
    )
  }

  return (
    <div className='TrackListItemHandle-sortableContainer'>
      <SortHandle className='TrackListItemHandle-sortHandle' />
      <IndexOrIcon {...props} />
    </div>
  )
}

TrackListItemHandle.propTypes = {
  trackIndex: PropTypes.number,
  track: PropTypes.shape({
    index: PropTypes.number
  }),
  currentlyPlaying: PropTypes.bool,
  playerState: PropTypes.string,
  sortable: PropTypes.boolean
}

export default TrackListItemHandle
