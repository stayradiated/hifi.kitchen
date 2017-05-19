import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'

import ItemsList from '../List/withAutoSizer'
import TrackListItem from './Item'
import TrackListSummary from './Summary'
import AsyncListLayout from '../AsyncListLayout'

/* eslint react/prop-types: "off" */
const handleTrackItem = (props) => (trackId, index) => ({key, style}) => {
  const {
    values, preserveTrackIndex, currentlyPlayingTrackId, displayArtist,
    playerState, onRateTrack, onSelectTrack,
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
      index={preserveTrackIndex ? track.index : index + 1}
      playerState={playerState}
      currentlyPlaying={trackId === currentlyPlayingTrackId}
      onRate={onRateTrack}
      onSelect={onSelectTrack}
      displayArtist={displayArtist}
    />
  )
}

const handleSummary = (props) => () => ({style, key}) => {
  const {trackIds, values} = props

  return (
    <TrackListSummary
      key={key}
      style={style}
      trackIds={trackIds}
      values={values}
    />
  )
}

function TrackList (props) {
  const {trackIds, renderTrackItem, renderSummary, onLoadItems} = props

  const layout = [
    {
      size: trackIds.length,
      items: trackIds,
      render: renderTrackItem,
    },
    {
      size: 1,
      items: [true],
      render: renderSummary,
    },
  ]

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

TrackList.propTypes = {
  trackIds: PropTypes.arrayOf(PropTypes.number),
  onLoadItems: PropTypes.func,
}

TrackList.defaultProps = {
  tracksIds: [],
}

export default compose(
  setPropTypes({
    currentlyPlayingTrackId: PropTypes.number,
    displayArtist: PropTypes.string,
    onRateTrack: PropTypes.func.isRequired,
    onSelectTrack: PropTypes.func.isRequired,
    playerState: PropTypes.string,
    preserveTrackIndex: PropTypes.bool,
  }),
  withHandlers({
    renderTrackItem: handleTrackItem,
    renderSummary: handleSummary,
  })
)(TrackList)
