import React, {PropTypes} from 'react'

import Artist from '../Artist'
import ArtistContainer from '../../containers/ArtistInfo'
import MagicGrid from '../MagicGrid'

export default function ArtistGrid (props) {
  const {artists, artistId, librarySectionId} = props

  const items = artists.map((artist) => ({
    id: artist.id,
    element: <Artist artist={artist} />,
  }))

  return (
    <MagicGrid
      items={items}
      itemWidth={150}
      component={<ArtistContainer librarySectionId={librarySectionId} />}
      propName='artistId'
      currentId={artistId}
    />
  )
}

ArtistGrid.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistId: PropTypes.number,
  librarySectionId: PropTypes.number,
}
