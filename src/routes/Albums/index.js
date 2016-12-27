import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ScaleLoader from 'halogen/ScaleLoader'

import './styles.css'

import AlbumGrid from '../../components/AlbumGrid'
import ControlsContainer from '../../containers/Controls'
import HeaderContainer from '../../containers/Header'

import {
  selectors as getAlbums,
} from '../../stores/albums'

import {
  selectors as getLibrary,
} from '../../stores/library'

import {
  fetchLibraryAlbums,
} from '../../stores/actions'

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
        <HeaderContainer />
        <div className='AlbumsRoute-contents'>
          <AlbumGrid
            albums={albums}
            albumId={albumId}
            librarySectionId={librarySectionId}
          />
          {loadingAlbums
            ? <ScaleLoader color='rgba(255, 255, 255, 0.5)' />
            : <button onClick={this.fetchAlbums}>Fetch Albums</button>}
        </div>
        <ControlsContainer />
      </div>
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section, id: albumId} = params

  const allAlbums = getAlbums.values(state)

  return {
    albums: getLibrary.value(state).map((id) => allAlbums.get(id)),
    loadingAlbums: !!getLibrary.promise(state),
    librarySectionId: section ? parseInt(section, 10) : null,
    albumId: albumId ? parseInt(albumId, 10) : null,
  }
})(AlbumsRoute)
