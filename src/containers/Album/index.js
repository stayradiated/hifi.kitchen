import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import AlbumInfo from '../../components/AlbumInfo'

import {rateTrack} from '../../stores/tracks/all/actions'
import {fetchAlbumTracks} from '../../stores/albums/tracks/actions'
import {
  createQueueFromAlbum,
  createQueueFromPlexMix,
} from '../../stores/queue/actions'

import {values as getAllAlbums} from '../../stores/albums/all/selectors'
import {values as getAllAlbumTracks} from '../../stores/albums/tracks/selectors'
import {values as getAllTracks} from '../../stores/tracks/all/selectors'

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
    this.handlePlexMix = this.handlePlexMix.bind(this)
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
    dispatch(createQueueFromAlbum(librarySectionId, album, track))
  }

  handlePlexMix (track) {
    const {librarySectionId, dispatch} = this.props
    dispatch(createQueueFromPlexMix(librarySectionId, track))
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
  const allTracks = getAllTracks(state)
  const allAlbumTracks = getAllAlbumTracks(state)
  const allAlbums = getAllAlbums(state)

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
