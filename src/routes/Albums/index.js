import React, {Component} from 'react'

import config from '../../../config.json'

import './styles.css'

import Plex from '../../types/Client'
import AlbumGrid from '../../components/AlbumGrid'
import AlbumInfo from '../../components/AlbumInfo'

export default class Albums extends Component {
  constructor () {
    super()

    this.plex = new Plex(config.server)

    this.state = {
      albums: [],
      selectedAlbum: null,
      index: 0,
    }

    this.handleSelectAlbum = this.handleSelectAlbum.bind(this)
    this.fetchAlbums = this.fetchAlbums.bind(this)
  }

  componentWillMount () {
    this.fetchAlbums()
  }

  fetchAlbums () {
    const {index, albums} = this.state

    this.plex.albums(index, 20)
      .then((media) => {
        const allAlbums = albums.concat(media.metadata)
        this.setState({
          albums: allAlbums,
          index: allAlbums.length,
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  handleSelectAlbum (album) {
    this.setState({selectedAlbum: album})
  }

  render () {
    const {albums, selectedAlbum} = this.state

    return (
      <div className='route_Albums'>
        <h2 className='route_Albums-header'>Plex</h2>
        <div className='route_Albums-contents'>
          <AlbumGrid
            albums={albums}
            onSelect={this.handleSelectAlbum}
          />
          <button onClick={this.fetchAlbums}>Fetch Albums</button>
          {selectedAlbum &&
            <AlbumInfo album={selectedAlbum} />}
        </div>
      </div>
    )
  }
}
