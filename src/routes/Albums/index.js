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
    albums: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
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
    const {albums, children} = this.props

    return (
      <div className='AlbumsRoute'>
        <h2 className='AlbumsRoute-header'>Plex</h2>
        <div className='AlbumsRoute-contents'>
          <AlbumGrid albums={albums} />
          <button onClick={this.fetchAlbums}>Fetch Albums</button>
          {children}
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
