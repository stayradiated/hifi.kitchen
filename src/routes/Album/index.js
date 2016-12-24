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
  selectors as getTracks,
} from '../../stores/tracks'

class AlbumRoute extends Component {
  static propTypes = {
    albumId: PropTypes.number.isRequired,
    album: PropTypes.shape({}),
    albumTracks: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired,
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

  render () {
    const {album, albumTracks} = this.props

    if (album == null || albumTracks == null) {
      return null
    }

    return (
      <AlbumInfo
        album={album}
        albumTracks={albumTracks}
      />
    )
  }
}

export default connect((state, props) => {
  // extract albumId from router params
  const albumId = parseInt(props.params.id, 10)

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
})(AlbumRoute)
