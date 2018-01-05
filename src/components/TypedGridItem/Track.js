import React from 'react'
import PropTypes from 'prop-types'
import withHandlers from 'recompose/withHandlers'

import { TRACK } from '@stayradiated/hifi-redux'

import GridItem from '../GridItem'

const handleSelect = (props) => () => {
  const { track, onSelect } = props
  onSelect(TRACK, track.id)
}

function TrackItem (props) {
  const { track, ...otherProps } = props

  return (
    <GridItem
      {...otherProps}
      image={track.thumb}
      title={track.title}
      subtitle={track.originalTitle}
    />
  )
}

TrackItem.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.number,
    thumb: PropTypes.string,
    title: PropTypes.string
  }).isRequired
}

export default withHandlers({
  onSelect: handleSelect
})(TrackItem)
