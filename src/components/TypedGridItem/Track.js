import React from 'react'

import PropTypes from 'prop-types'

import GridItem from '../GridItem'

export default function TrackItem (props) {
  const {track, ...otherProps} = props

  return (
    <GridItem
      {...otherProps}
      id={track.id}
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
    title: PropTypes.string,
  }).isRequired,
}
