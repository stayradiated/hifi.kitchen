import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'

import { ARTIST } from '@stayradiated/hifi-redux'

import GridItem from '../GridItem'

const handleSelect = (props) => () => {
  const { artist, onSelect } = props
  onSelect(ARTIST, artist.id)
}

function ArtistItem (props) {
  const { artist, ...otherProps } = props

  return (
    <GridItem
      {...otherProps}
      image={artist.thumb}
      title={artist.title}
      subtitle={artist.genre.join(', ')}
    />
  )
}

ArtistItem.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.number,
    thumb: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
}

export default withHandlers({
  onSelect: handleSelect
})(ArtistItem)
