import React, {Component} from 'react'

import config from '../config.json'

import './App.css'

import Plex from './types/Client'
import AlbumGrid from './components/AlbumGrid'

class App extends Component {
  constructor () {
    super()

    this.plex = new Plex(config.server)

    this.state = {
      albums: [],
    }
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

  render () {
    const {albums} = this.state

    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Plex</h2>
        </div>
        <div>
          <AlbumGrid albums={albums} />
        </div>
      </div>
    )
  }
}

export default App
