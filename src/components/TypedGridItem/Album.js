import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'
import { ALBUM } from '@stayradiated/hifi-redux'

import GridItem from '../GridItem'

const handleSelect = (props) => () => {
  const { album, onSelect } = props
  onSelect(ALBUM, album.id)
}

function AlbumItem (props) {
  const { album, ...otherProps } = props

  return (
    <GridItem
      {...otherProps}
      image={album.thumb}
      title={album.title}
      subtitle={album.parentTitle}
    />
  )
}

AlbumItem.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number,
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string
  }).isRequired
}

export default withHandlers({
  onSelect: handleSelect
})(AlbumItem)
