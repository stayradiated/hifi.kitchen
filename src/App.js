import React, {Component} from 'react'

import config from '../config.json'

import './App.css'

import Plex from './types/Client'
import AlbumGrid from './components/AlbumGrid'
import AlbumInfo from './components/AlbumInfo'

class App extends Component {
  constructor () {
    super()

    this.plex = new Plex(config.server)

    this.state = {
      albums: [],
      selectedAlbum: null,
    }

    this.handleSelectAlbum = this.handleSelectAlbum.bind(this)
  }

  componentWillMount () {
    this.plex.albums()
      .then((media) => {
        this.setState((state) => ({
          albums: state.albums.concat(media.metadata),
        }))
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
      <div className='App'>
        <h2 className='App-header'>Plex</h2>
        <div>
          <AlbumGrid
            albums={albums}
            onSelect={this.handleSelectAlbum}
          />
          {selectedAlbum &&
            <AlbumInfo album={selectedAlbum} />}
        </div>
      </div>
    )
  }
}

export default App
