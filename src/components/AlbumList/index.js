import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import withHandlers from 'recompose/withHandlers'

import ItemsList from '../List/withAutoSizer'
import AlbumListHeader from './Header'
import TrackListItem from '../TrackList/Item'
import TrackListSummary from '../TrackList/Summary'
import AsyncListLayout from '../AsyncListLayout'

/* eslint react/prop-types: "off" */
const handleTrackItem = (props) => (trackId) => ({key, style}) => {
  const {
    values, displayArtist, currentlyPlayingTrackId,
    onRateTrack, onSelectTrack,
  } = props

  const track = values.tracks.get(trackId)

  if (track == null) {
    return (
      <div key={key} style={style} />
    )
  }

  return (
    <TrackListItem
      key={key}
      style={style}
      track={track}
      index={track.index}
      currentlyPlaying={trackId === currentlyPlayingTrackId}
      onRate={onRateTrack}
      onSelect={onSelectTrack}
      displayArtist={displayArtist}
    />
  )
}

const handleAlbumHeader = (props) => (albumId) => ({key, style}) => {
  const {values} = props
  const album = values.albums.get(albumId)

  return (
    <AlbumListHeader key={key} style={style} album={album} />
  )
}

const handleAlbumSummary = (props) => () => ({key, style}) => {
  const {albumIds, values} = props

  const trackIds = albumIds
    .map((albumId) => values.albumTracks.get(albumId))
    .reduce((acc, tracks) => acc.concat(tracks), [])

  return (
    <TrackListSummary
      key={key}
      style={style}
      trackIds={trackIds}
      values={values}
    />
  )
}

function AlbumList (props) {
  const {
    albumIds, values,
    renderAlbumHeader, renderTrackItem, renderAlbumSummary,
    onLoadItems,
  } = props

  const layout = []
  for (let i = 0; i < albumIds.length; i += 1) {
    const albumId = albumIds[i]
    const albumTracks = values.albumTracks.get(albumId) || []

    layout.push({
      size: 1,
      items: [albumId],
      render: renderAlbumHeader,
    })

    layout.push({
      size: albumTracks.length,
      items: albumTracks,
      render: renderTrackItem,
    })
  }

  layout.push({
    size: 1,
    items: [true],
    render: renderAlbumSummary,
  })

  return (
    <AsyncListLayout layout={layout} onLoad={onLoadItems}>
      {({rowCount, isRowLoaded, renderItem, onLoad}) => (
        <ItemsList
          rowHeight={40}
          rowCount={rowCount}
          renderItem={renderItem}
          isRowLoaded={isRowLoaded}
          onLoad={onLoad}
        />
      )}
    </AsyncListLayout>
  )
}

AlbumList.propTypes = {
  albumIds: PropTypes.arrayOf(PropTypes.number),
  values: PropTypes.shape({
    albumTracks: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  renderAlbumHeader: PropTypes.func.isRequired,
  renderTrackItem: PropTypes.func.isRequired,
  renderAlbumSummary: PropTypes.func.isRequired,
  onLoadItems: PropTypes.func,
}

AlbumList.defaultProps = {
  albumIds: [],
}

export default compose(
  setPropTypes({
    displayArtist: PropTypes.bool,
    currentlyPlayingTrackId: PropTypes.number,
    onRateTrack: PropTypes.func.isRequired,
    onSelectTrack: PropTypes.func.isRequired,
  }),
  withHandlers({
    renderAlbumHeader: handleAlbumHeader,
    renderTrackItem: handleTrackItem,
    renderAlbumSummary: handleAlbumSummary,
  })
)(AlbumList)
