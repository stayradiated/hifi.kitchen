import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import withHandlers from 'recompose/withHandlers'

import { ARTIST, ALBUM } from '@stayradiated/hifi-redux'

import Panel from '../Panel'
import TrackList from '../TrackList'

const handleClickSubtitle = (props) => () => {
  const { album, onNavigate } = props
  onNavigate(ARTIST, album.parentId)
}

const handleSelectTrack = (props) => (track) => {
  const { album, onCreateQueue } = props
  onCreateQueue(ALBUM, album.id, track.id)
}

function AlbumPanel (props) {
  const {
    album, values, currentlyPlayingTrackId, playerState,
    onRateTrack, onLoadItems, onClickSubtitle, onSelectTrack,
    ...otherProps
  } = props

  const details = {
    thumb: album.thumb,
    title: album.title,
    subtitle: album.parentTitle,
    meta: album.year != null ? album.year.toString() : ''
  }

  const albumTracks = values.albumTracks.get(album.id) || []

  return (
    <Panel
      {...otherProps}
      details={details}
      onClickSubtitle={onClickSubtitle}
    >
      <TrackList
        displayArtist={album.parentTitle}
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        onLoadItems={onLoadItems}
        onRateTrack={onRateTrack}
        onSelectTrack={onSelectTrack}
        playerState={playerState}
        preserveTrackIndex
        trackIds={albumTracks}
        values={values}
      />
    </Panel>
  )
}

AlbumPanel.propTypes = {
  album: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
    pear: PropTypes.number,
    tracks: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  currentlyPlayingTrackId: PropTypes.number,
  onClickSubtitle: PropTypes.func.isRequired,
  onLoadItems: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,
  onSelectTrack: PropTypes.func.isRequired,
  playerState: PropTypes.string,
  values: PropTypes.shape({
    albumTracks: PropTypes.instanceOf(Map),
    tracks: PropTypes.instanceOf(Map)
  }).isRequired
}

export default compose(
  setPropTypes({
    onNavigate: PropTypes.func.isRequired,
    onCreateQueue: PropTypes.func.isRequired
  }),
  withHandlers({
    onClickSubtitle: handleClickSubtitle,
    onSelectTrack: handleSelectTrack
  })
)(AlbumPanel)
