import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import AlbumGrid from '../../components/AlbumGrid'

import {fetchLibraryAlbumsRange} from '../../stores/library/albums/actions'

import {values as getAllAlbums} from '../../stores/albums/all/selectors'
import * as selectLibraryAlbums from '../../stores/library/albums/selectors'

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
      this.fetchAlbums(0, 20)
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
  const {section, id: albumId} = params

  const allAlbums = getAllAlbums(state)

  return {
    albums: selectLibraryAlbums.values(state).map((id) => allAlbums.get(id)),
    totalAlbums: selectLibraryAlbums.total(state),
    librarySectionId: section ? parseInt(section, 10) : null,
    albumId: albumId ? parseInt(albumId, 10) : null,
  }
})(AlbumsRoute)
