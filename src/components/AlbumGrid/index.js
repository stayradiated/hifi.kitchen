import React, {PropTypes} from 'react'

import AlbumItem from '../AlbumItem'
import AlbumContainer from '../../containers/AlbumInfo'
import MuggleGrid from '../MuggleGrid'

export default function AlbumGrid (props) {
  const {albums, albumId, librarySectionId, ...otherProps} = props

  return (
    <MuggleGrid
      {...otherProps}
      component={<AlbumContainer librarySectionId={librarySectionId} />}
      currentId={albumId}
      getElement={(album) => <AlbumItem album={album} />}
      items={albums}
      propName='albumId'
    />
  )
}

AlbumGrid.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  albumId: PropTypes.number,
  librarySectionId: PropTypes.number,
}
