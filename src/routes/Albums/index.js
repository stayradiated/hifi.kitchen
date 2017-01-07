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
    albums: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalAlbums: PropTypes.number.isRequired,
    librarySectionId: PropTypes.number.isRequired,
    albumId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
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
    const {librarySectionId, dispatch} = this.props
    dispatch(fetchLibraryAlbumsRange(librarySectionId, start, end))
  }

  render () {
    const {librarySectionId, albumId, albums, totalAlbums} = this.props

    return (
      <AlbumGrid
        albums={albums}
        albumId={albumId}
        librarySectionId={librarySectionId}
        onLoad={this.fetchAlbums}
        total={totalAlbums}
      />
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section, id} = params

  const librarySectionId = section ? parseInt(section, 10) : null

  const allAlbums = selectAllAlbums.values(state)
  const albums = (selectLibraryAlbums.values(state).get(librarySectionId) || [])
    .map((albumId) => allAlbums.get(albumId))

  const albumId = id ? parseInt(id, 10) : null
  const totalAlbums = selectLibraryAlbums.total(state)

  return {
    librarySectionId,
    albumId,
    albums,
    totalAlbums,
  }
})(AlbumsRoute)
