import React, {PropTypes} from 'react'

import GridItem from '../GridItem'

export default function ArtistItem (props) {
  const {artist, ...otherProps} = props

  return (
    <GridItem
      {...otherProps}
      id={artist.id}
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
    genre: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}
