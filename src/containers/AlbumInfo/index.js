import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import AlbumInfo from '../../components/AlbumInfo'

import {rateTrack, selectAllTracks} from '../../stores/tracks/all'
import {fetchAlbum, selectAllAlbums} from '../../stores/albums/all'
import {fetchAlbumTracks, selectAllAlbumTracks} from '../../stores/albums/tracks'

import {
  createQueueFromAlbum,
  createQueueFromPlexMix,
} from '../../stores/queue/actions'

class AlbumContainer extends Component {
  static propTypes = {
    albumId: PropTypes.number.isRequired,
    album: PropTypes.shape({}),
    albumTracks: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handleSelectTrack = this.handleSelectTrack.bind(this)
    this.handleRateTrack = this.handleRateTrack.bind(this)
    this.handlePlexMix = this.handlePlexMix.bind(this)
  }

  componentWillMount () {
    this.fetchAlbum(this.props.albumId, ['librarySectionID'])
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.albumId !== this.props.albumId) {
      this.fetchAlbum(nextProps.albumId)
    }
  }

  fetchAlbum (albumId) {
    const {dispatch} = this.props
    dispatch(fetchAlbum(albumId))
    dispatch(fetchAlbumTracks(albumId))
  }

  handleSelectTrack (track) {
    const {album, dispatch} = this.props
    dispatch(createQueueFromAlbum(album, track))
  }

  handlePlexMix (track) {
    const {dispatch} = this.props
    dispatch(createQueueFromPlexMix(track))
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
        onPlexMix={this.handlePlexMix}
        onRateTrack={this.handleRateTrack}
      />
    )
  }
}

export default connect((state, props) => {
  const {albumId} = props

  // select state
  const allTracks = selectAllTracks.values(state)
  const allAlbumTracks = selectAllAlbumTracks.values(state)
  const allAlbums = selectAllAlbums.values(state)

  // get albumTracks
  const albumTrackIds = allAlbumTracks.get(albumId) || []
  const albumTracks = albumTrackIds.map((id) => allTracks.get(id))

  // get album
  const album = allAlbums.get(albumId)

  return {
    album,
    albumTracks,
  }
})(AlbumContainer)
