import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import AlbumInfo from '../../components/AlbumInfo'

import {
  selectors as getAlbums,
} from '../../stores/albums'

import {
  fetchAlbumTracks,
  selectors as getAlbumTracks,
} from '../../stores/albumTracks'

import {
  rateTrack,
  selectors as getTracks,
} from '../../stores/tracks'

import {
  playTrack,
  createQueueFromAlbum,
} from '../../stores/queue'

class AlbumContainer extends Component {
  static propTypes = {
    albumId: PropTypes.number.isRequired,
    album: PropTypes.shape({}),
    albumTracks: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired,
    librarySectionId: PropTypes.number.isRequired,
  }

  constructor () {
    super()

    this.handleSelectTrack = this.handleSelectTrack.bind(this)
    this.handleRateTrack = this.handleRateTrack.bind(this)
  }

  componentWillMount () {
    this.fetchAlbum(this.props.albumId)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.albumId !== this.props.albumId) {
      this.fetchAlbum(nextProps.albumId)
    }
  }

  fetchAlbum (albumId) {
    const {dispatch} = this.props
    dispatch(fetchAlbumTracks(albumId))
  }

  handleSelectTrack (track) {
    const {album, librarySectionId, dispatch} = this.props

    dispatch(createQueueFromAlbum(librarySectionId, album))
    dispatch(playTrack(track))
  }

  handleRateTrack (track, rating) {
    const {dispatch} = this.props
    dispatch(rateTrack(track, rating))
  }

  render () {
    const {album, albumTracks} = this.props

    if (album == null || albumTracks == null) {
      return null
    }

    return (
      <AlbumInfo
        album={album}
        albumTracks={albumTracks}
        onSelectTrack={this.handleSelectTrack}
        onRateTrack={this.handleRateTrack}
      />
    )
  }
}

export default connect((state, props) => {
  const {albumId} = props

  // combine tracks and albumTracks stores
  const allTracks = getTracks.values(state)
  const allAlbumTracks = getAlbumTracks.values(state)
  const albumTrackIds = allAlbumTracks.get(albumId) || []
  const albumTracks = albumTrackIds.map((id) => allTracks.get(id))

  // get album
  const allAlbums = getAlbums.values(state)
  const album = allAlbums.get(albumId)

  return {
    albumId,
    album,
    albumTracks,
  }
})(AlbumContainer)
