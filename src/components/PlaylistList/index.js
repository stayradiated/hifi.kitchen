import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import setPropTypes from 'recompose/setPropTypes'
import withHandlers from 'recompose/withHandlers'

import ItemsList from '../List/withAutoSizer'
import AsyncListLayout from '../AsyncListLayout'
import PlaylistListItem from '../PlaylistList/Item'

/* eslint react/prop-types: "off" */
const handleRenderPlaylistItem = (props) => (playlistId) => ({key, style}) => {
  const {values, onSelectPlaylist} = props

  const playlist = values.playlists.get(playlistId)

  if (playlist == null) {
    return (
      <div key={key} style={style} />
    )
  }

  return (
    <PlaylistListItem
      key={key}
      style={style}
      playlist={playlist}
      onSelect={onSelectPlaylist}
    />
  )
}

function PlaylistList (props) {
  const {playlistIds, renderPlaylistItem, onLoadItems} = props

  const layout = [{
    size: playlistIds.length,
    items: playlistIds,
    render: renderPlaylistItem,
  }]

  return (
    <AsyncListLayout layout={layout} onLoad={onLoadItems}>
      {({rowCount, isRowLoaded, renderItem, onLoad}) => (
        <ItemsList
          rowHeight={60}
          rowCount={rowCount}
          renderItem={renderItem}
          isRowLoaded={isRowLoaded}
          onLoad={onLoad}
        />
      )}
    </AsyncListLayout>
  )
}

PlaylistList.propTypes = {
  playlistIds: PropTypes.arrayOf(PropTypes.number),
  renderPlaylistItem: PropTypes.func.isRequired,
  onLoadItems: PropTypes.func.isRequired,
}

PlaylistList.defaultProps = {
  playlistIds: [],
}

export default compose(
  setPropTypes({
    values: PropTypes.shape({
      playlists: PropTypes.instanceOf(Map).isRequired,
    }).isRequired,
    onSelectPlaylist: PropTypes.func.isRequired,
  }),
  withHandlers({
    renderPlaylistItem: handleRenderPlaylistItem,
  })
)(PlaylistList)
