import React, {PropTypes} from 'react'

import GridItem from '../GridItem'

export default function ArtistItem (props) {
  const {artist} = props

  return (
    <GridItem
      link={`/library/1/artists/${artist.id}`}
      image={artist.thumb}
      title={artist.title}
      subtitle={artist.country && artist.country[0]}
    />
  )
}

ArtistItem.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.number,
    thumb: PropTypes.string,
    title: PropTypes.string,
    country: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}
