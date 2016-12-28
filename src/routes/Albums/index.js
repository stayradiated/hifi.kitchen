import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ScaleLoader from 'halogen/ScaleLoader'

import './styles.css'

import AlbumGrid from '../../components/AlbumGrid'

import {fetchLibraryAlbums} from '../../stores/library/albums/actions'

import {values as getAllAlbums} from '../../stores/albums/all/selectors'
import * as selectLibraryAlbums from '../../stores/library/albums/selectors'

class AlbumsRoute extends Component {
  static propTypes = {
    albums: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadingAlbums: PropTypes.bool.isRequired,
    librarySectionId: PropTypes.number.isRequired,
    albumId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.fetchAlbums = this.fetchAlbums.bind(this)
  }

  componentWillMount () {
    this.fetchAlbums()
  }

  fetchAlbums () {
    const {librarySectionId, dispatch} = this.props
    dispatch(fetchLibraryAlbums(librarySectionId, 50))
  }

  render () {
    const {librarySectionId, albumId, albums, loadingAlbums} = this.props

    return (
      <div className='AlbumsRoute'>
        <AlbumGrid
          albums={albums}
          albumId={albumId}
          librarySectionId={librarySectionId}
        />
        <div className='AlbumsRoute-loadMore'>
          {loadingAlbums
              ? <ScaleLoader color='rgba(255, 255, 255, 0.5)' />
              : <button className='AlbumsRoute-loadMoreButton' onClick={this.fetchAlbums}>Fetch Albums</button>}
        </div>
      </div>
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section, id: albumId} = params

  const allAlbums = getAllAlbums(state)

  return {
    albums: selectLibraryAlbums.value(state).map((id) => allAlbums.get(id)),
    loadingAlbums: !!selectLibraryAlbums.promise(state),
    librarySectionId: section ? parseInt(section, 10) : null,
    albumId: albumId ? parseInt(albumId, 10) : null,
  }
})(AlbumsRoute)
