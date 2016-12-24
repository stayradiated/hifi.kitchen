import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import './styles.css'

import AlbumGrid from '../../components/AlbumGrid'

import {
  selectors as getAlbums,
} from '../../stores/albums'

import {
  fetchLibraryAlbums,
  selectors as getLibrary,
} from '../../stores/library'

class AlbumsRoute extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    albums: PropTypes.arrayOf(PropTypes.object).isRequired,
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
    const {dispatch} = this.props
    dispatch(fetchLibraryAlbums(50))
  }

  render () {
    const {albums, params} = this.props

    const albumId = params.id ? parseInt(params.id, 10) : null

    return (
      <div className='AlbumsRoute'>
        <h2 className='AlbumsRoute-header'>Plex</h2>
        <div className='AlbumsRoute-contents'>
          <AlbumGrid albums={albums} albumId={albumId} />
          <button onClick={this.fetchAlbums}>Fetch Albums</button>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  const allAlbums = getAlbums.values(state)

  return {
    albums: getLibrary.value(state).map((id) => allAlbums.get(id)),
  }
})(AlbumsRoute)
