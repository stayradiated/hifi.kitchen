import React, {PropTypes} from 'react'

import ArtistItem from '../ArtistItem'
import ArtistContainer from '../../containers/ArtistInfo'
import MuggleGrid from '../MuggleGrid'

export default function ArtistGrid (props) {
  const {artists, artistId, librarySectionId, ...otherProps} = props

  return (
    <MuggleGrid
      {...otherProps}
      component={<ArtistContainer librarySectionId={librarySectionId} />}
      currentId={artistId}
      getElement={(artist) => <ArtistItem artist={artist} />}
      items={artists}
      propName='artistId'
    />
  )
}

ArtistGrid.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  artistId: PropTypes.number,
  librarySectionId: PropTypes.number,
}
