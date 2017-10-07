import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'

import ItemsList from '../List/withAutoSizer'
import TrackListItem from '../TrackList/Item'
import TrackListSummary from '../TrackList/Summary'
import AsyncListLayout from '../AsyncListLayout'

/* eslint react/prop-types: "off" */
const handlePlaylistItem = (props) => (item, index) => ({key, style}) => {
  const {
    values, currentlyPlayingTrackId,
    playerState, onRateTrack, onSelectTrack,
  } = props

  const track = item && values.tracks.get(item.track)

  if (item == null || track == null) {
    return (
      <div key={key} style={style} />
    )
  }

  return (
    <TrackListItem
      displayArtist
      key={key}
      style={style}
      track={track}
      index={index + 1}
      context={{
        playlistItem: item,
      }}
      playerState={playerState}
      currentlyPlaying={item.trackId === currentlyPlayingTrackId}
      onRate={onRateTrack}
      onSelect={onSelectTrack}
    />
  )
}

const handleSummary = (props) => () => ({style, key}) => {
  const {playlistItems, values} = props

  const trackIds = playlistItems.map((item) => item && item.track)

  return (
    <TrackListSummary
      key={key}
      style={style}
      trackIds={trackIds}
      values={values}
    />
  )
}

function PlaylistItemList (props) {
  const {playlistItems, renderPlaylistItem, renderSummary, onLoadItems} = props

  const layout = [
    {
      size: playlistItems.length,
      items: playlistItems,
      render: renderPlaylistItem,
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

PlaylistItemList.propTypes = {
  playlistItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    track: PropTypes.numbers,
  })),
  onLoadItems: PropTypes.func,
}

PlaylistItemList.defaultProps = {
  playlistItems: [],
}

export default compose(
  setPropTypes({
    currentlyPlayingTrackId: PropTypes.number,
    displayArtist: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onRateTrack: PropTypes.func.isRequired,
    onSelectTrack: PropTypes.func.isRequired,
    playerState: PropTypes.string,
    preserveTrackIndex: PropTypes.bool,
  }),
  withHandlers({
    renderPlaylistItem: handlePlaylistItem,
    renderSummary: handleSummary,
  })
)(PlaylistItemList)
