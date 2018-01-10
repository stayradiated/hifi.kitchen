import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'
import withState from 'recompose/withState'

import SortableItemsList from '../SortableList'
import TrackListItemSortable from '../TrackList/ItemSortable'
import TrackListItemLoading from '../TrackList/ItemLoading'
import TrackListSummary from '../TrackList/Summary'
import AsyncListLayout from '../AsyncListLayout'

const handleClickTime = (props) => (event) => {
  event.stopPropagation()
  const { useRelativeTime, setUseRelativeTime } = props
  setUseRelativeTime(!useRelativeTime)
}

/* eslint react/prop-types: "off" */
const handlePlaylistItem = (props) => (item, index) => ({ key, style }) => {
  const {
    values, currentlyPlayingTrackId,
    playlistItems, playerState,
    useRelativeTime,
    onClickTime, onRateTrack, onSelectTrack
  } = props

  const track = item && values.tracks.get(item.track)

  if (item == null || track == null) {
    return (
      <TrackListItemLoading
        key={key}
        index={index + 1}
        style={style}
      />
    )
  }

  let relativeTrackStartTime = null
  if (useRelativeTime) {
    relativeTrackStartTime = playlistItems
      .slice(0, index)
      .reduce((sum, item) => sum + values.tracks.get(item.track).duration, 0)
  }

  return (
    <TrackListItemSortable
      displayArtist
      sortable
      key={key}
      style={style}
      track={track}
      trackIndex={index + 1}
      context={{
        playlistItem: item
      }}
      index={index}
      relativeTrackStartTime={relativeTrackStartTime}
      playerState={playerState}
      currentlyPlaying={item.trackId === currentlyPlayingTrackId}
      onRate={onRateTrack}
      onSelect={onSelectTrack}
      onClickTime={onClickTime}
    />
  )
}

const handleSummary = (props) => () => ({ style, key }) => {
  const { playlistItems, values } = props

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
  const {
    playlistItems, renderPlaylistItem, renderSummary,
    onLoadItems, onSort
  } = props

  const layout = [
    {
      size: playlistItems.length,
      items: playlistItems,
      render: renderPlaylistItem
    },
    {
      size: 1,
      items: [true],
      render: renderSummary
    }
  ]

  return (
    <AsyncListLayout layout={layout} onLoad={onLoadItems}>
      {({ rowCount, isRowLoaded, renderItem, onLoad }) => (
        <SortableItemsList
          rowHeight={40}
          rowCount={rowCount}
          renderItem={renderItem}
          isRowLoaded={isRowLoaded}
          onLoad={onLoad}
          onSortEnd={onSort}
          useDragHandle
          lockAxis='y'
          helperClass='TrackListItem-helper SortHandle-helper'
        />
      )}
    </AsyncListLayout>
  )
}

PlaylistItemList.propTypes = {
  playlistItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    track: PropTypes.numbers
  })),
  onLoadItems: PropTypes.func,
  onSort: PropTypes.func.isRequired
}

PlaylistItemList.defaultProps = {
  playlistItems: []
}

export default compose(
  setPropTypes({
    currentlyPlayingTrackId: PropTypes.number,
    displayArtist: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    onRateTrack: PropTypes.func.isRequired,
    onSelectTrack: PropTypes.func.isRequired,
    playerState: PropTypes.string,
    preserveTrackIndex: PropTypes.bool,
    useRelativeTime: PropTypes.bool
  }),
  withState('useRelativeTime', 'setUseRelativeTime', false),
  withHandlers({
    onClickTime: handleClickTime
  }),
  withHandlers({
    renderPlaylistItem: handlePlaylistItem,
    renderSummary: handleSummary
  })
)(PlaylistItemList)
