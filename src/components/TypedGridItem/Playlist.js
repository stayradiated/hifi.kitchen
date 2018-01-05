import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'
import plural from 'plural'

import { PLAYLIST } from '@stayradiated/hifi-redux'

import GridItem from '../GridItem'

const handleSelect = (props) => () => {
  const { playlist, onSelect } = props
  onSelect(PLAYLIST, playlist.id)
}

function PlaylistItem (props) {
  const { playlist, ...otherProps } = props

  return (
    <GridItem
      {...otherProps}
      image={playlist.composite}
      title={playlist.title}
      subtitle={`${playlist.leafCount} ${plural('item', playlist.leafCount)}`}
    />
  )
}

PlaylistItem.propTypes = {
  playlist: PropTypes.shape({
    id: PropTypes.number,
    composite: PropTypes.string,
    title: PropTypes.string,
    tracks: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
}

export default withHandlers({
  onSelect: handleSelect
})(PlaylistItem)
