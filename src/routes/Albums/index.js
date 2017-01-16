import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import AlbumGrid from '../../components/AlbumGrid'

import {
  fetchLibraryAlbumsRange,
  selectLibraryAlbums,
} from '../../stores/library/albums'

import {
  selectAllAlbums,
} from '../../stores/albums/all'

class AlbumsRoute extends Component {
  static propTypes = {
    albumId: PropTypes.number,
    albums: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    sectionId: PropTypes.number.isRequired,
    totalAlbums: PropTypes.number.isRequired,
  }

  constructor () {
    super()

    this.fetchAlbums = this.fetchAlbums.bind(this)
  }

  componentWillMount () {
    const {albums} = this.props
    if (albums.length === 0) {
      this.fetchAlbums(0, 50)
    }
  }

  fetchAlbums (start, end) {
    const {sectionId, dispatch} = this.props
    dispatch(fetchLibraryAlbumsRange(sectionId, start, end))
  }

  render () {
    const {albumId, albums, totalAlbums} = this.props

    return (
      <AlbumGrid.withRouter
        items={albums}
        currentId={albumId}
        onLoad={this.fetchAlbums}
        total={totalAlbums}
        itemPath={(id, {serverId, sectionId}) =>
          `/server/${serverId}/sections/${sectionId}/albums/${id}`}
      />
    )
  }
}

export default connect((state, props) => {
  const {params} = props

  const sectionId = parseInt(params.sectionId, 10) || null
  const albumId = parseInt(params.albumId, 10) || null

  const allAlbums = selectAllAlbums.values(state)
  const totalAlbums = selectLibraryAlbums.total(state)
  const albums = (selectLibraryAlbums.values(state).get(sectionId) || [])
    .map((id) => allAlbums.get(id))

  return {
    albumId,
    albums,
    sectionId,
    totalAlbums,
  }
})(AlbumsRoute)
