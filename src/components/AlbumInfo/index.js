import React, {Component, PropTypes} from 'react'

import './styles.css'

import TrackList from '../TrackList'
import SquareImage from '../SquareImage'

export default class AlbumInfo extends Component {

  static propTypes = {
    album: PropTypes.shape({
    }).isRequired,
  }

  constructor () {
    super()

    this.state = {
      tracks: [],
    }
  }

  componentWillMount () {
    const {album} = this.props
    this.handleFetchAlbum(album)
  }

  componentWillReceiveProps (nextProps) {
    const {album} = nextProps
    this.handleFetchAlbum(album)
  }

  handleFetchAlbum (album) {
    album.fetchTracks().then((tracks) => this.setState({tracks}))
  }

  render () {
    const {album} = this.props
    const {tracks} = this.state

    const backgroundImage = album.thumb.transcode(300, 300)

    return (
      <div className='AlbumInfo' >
        <div
          className='AlbumInfo-background'
          style={{backgroundImage: `url(${backgroundImage})`}}
        />

        <SquareImage
          className='AlbumInfo-image'
          src={album.thumb.transcode(300, 300)}
          alt={album.title}
        />

        <div className='AlbumInfo-details'>
          <h2 className='AlbumInfo-title'>{album.title}</h2>
          <div className='AlbumInfo-row2'>
            <h2 className='AlbumInfo-artist'>{album.parentTitle}</h2>
            <h2 className='AlbumInfo-year'>{album.year}</h2>
          </div>
          <p className='AlbumInfo-genre'>{album.genre}</p>
          <TrackList tracks={tracks} />
        </div>
      </div>
    )
  }
}

