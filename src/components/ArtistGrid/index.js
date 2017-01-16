import React from 'react'

import ArtistItem from '../ArtistItem'
import ArtistContainer from '../../containers/ArtistInfo'
import MuggleGrid from '../MuggleGrid'
import withState from '../MuggleGrid/withState'
import withRouter from '../MuggleGrid/withRouter'

export default function ArtistGrid (props) {
  return (
    <MuggleGrid
      {...props}
      component={<ArtistContainer />}
      propName='artistId'
    >
      {(artist, handleSelect) => (
        <ArtistItem artist={artist} onSelect={handleSelect} />
      )}
    </MuggleGrid>
  )
}

ArtistGrid.withState = withState(ArtistGrid)
ArtistGrid.withRouter = withRouter(ArtistGrid)
