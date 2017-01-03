import React, {PropTypes} from 'react'

import GridItem from '../GridItem'

export default function AlbumItem (props) {
  const {album} = props

  return (
    <GridItem
      link={`/library/1/albums/${album.id}`}
      image={album.thumb}
      title={album.title}
      subtitle={album.parentTitle}
    />
  )
}

AlbumItem.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.number,
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
  }).isRequired,
}
