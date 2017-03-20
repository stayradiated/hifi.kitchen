import React, {PropTypes} from 'react'
import plural from 'plural'

import GridItem from '../GridItem'

export default function PlaylistItem (props) {
  const {playlist, ...otherProps} = props

  return (
    <GridItem
      {...otherProps}
      id={playlist.id}
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
    tracks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
}
