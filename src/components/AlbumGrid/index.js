import React from 'react'

import AlbumItem from '../AlbumItem'
import AlbumContainer from '../../containers/AlbumInfo'
import MuggleGrid from '../MuggleGrid'
import withState from '../MuggleGrid/withState'
import withRouter from '../MuggleGrid/withRouter'

export default function AlbumGrid (props) {
  return (
    <MuggleGrid {...props}>
      {[
        (album, handleSelect) => (
          <AlbumItem album={album} onSelect={handleSelect} />
        ),
        (albumId) => (
          <AlbumContainer albumId={albumId} />
        ),
      ]}
    </MuggleGrid>
  )
}

AlbumGrid.withState = withState(AlbumGrid)
AlbumGrid.withRouter = withRouter(AlbumGrid)
