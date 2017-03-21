import React, {PropTypes} from 'react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'

import ItemsList from '../List/withAutoSizer'
import TrackListItem from './Item'
// import TrackListSummary from './Summary'

/* eslint react/prop-types: "off" */
const handleRender = (props) => ({index, key, style}) => {
  const {
    trackIds, values, preserveTrackIndex,
    onRateTrack, onSelectTrack,
    currentlyPlayingTrackId, displayArtist,
  } = props

  const trackId = trackIds[index]
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
      currentlyPlaying={track.id === currentlyPlayingTrackId}
      onRate={onRateTrack}
      onSelect={onSelectTrack}
      displayArtist={displayArtist}
    />
  )
}

function TrackList (props) {
  const {trackIds, onRender, onLoadItems} = props

  // items.push(
  //   <TrackListSummary
  //     tracks={trackIds}
  //     values={values}
  //   />
  // )

  return (
    <ItemsList
      rowHeight={40}
      items={trackIds}
      renderItem={onRender}
      onLoad={onLoadItems}
    />
  )
}

TrackList.propTypes = {
  trackIds: PropTypes.arrayOf(PropTypes.number),
  onLoadItems: PropTypes.func,
}

TrackList.defaultProps = {
  tracks: [],
}

export default compose(
  setPropTypes({
    preserveTrackIndex: PropTypes.bool,
    currentlyPlayingTrackId: PropTypes.number,
    displayArtist: PropTypes.bool,
    onRateTrack: PropTypes.func.isRequired,
    onSelectTrack: PropTypes.func.isRequired,
  }),
  withHandlers({
    onRender: handleRender,
  })
)(TrackList)
