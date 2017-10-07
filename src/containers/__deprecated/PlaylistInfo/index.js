import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import PlaylistInfo from '../../components/PlaylistInfo'

import {rateTrack, selectAllTracks} from '../../stores/tracks/all'
import {fetchPlaylist} from '../../stores/playlists/all/actions'
import {fetchPlaylistTracks} from '../../stores/playlists/tracks/actions'
import {
  createQueueFromPlaylist,
  createQueueFromPlexMix,
} from '../../stores/queue/actions'

import {values as getAllPlaylists} from '../../stores/playlists/all/selectors'
import {values as getAllPlaylistTracks} from '../../stores/playlists/tracks/selectors'

class PlaylistContainer extends Component {
  static propTypes = {
    playlistId: PropTypes.number.isRequired,
    playlist: PropTypes.shape({}),
    playlistTracks: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handleSelectTrack = this.handleSelectTrack.bind(this)
    this.handleRateTrack = this.handleRateTrack.bind(this)
    this.handlePlexMix = this.handlePlexMix.bind(this)
  }

  componentWillMount () {
    this.fetchPlaylist(this.props.playlistId)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.playlistId !== this.props.playlistId) {
      this.fetchPlaylist(nextProps.playlistId)
    }
  }

  fetchPlaylist (playlistId) {
    const {dispatch} = this.props
    dispatch(fetchPlaylist(playlistId))
    dispatch(fetchPlaylistTracks(playlistId))
  }

  handleSelectTrack (track) {
    const {playlist, dispatch} = this.props
    dispatch(createQueueFromPlaylist(playlist.id, track))
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
    const {playlist, playlistTracks} = this.props

    if (playlist == null || playlistTracks == null) {
      return null
    }

    return (
      <PlaylistInfo
        playlist={playlist}
        playlistTracks={playlistTracks}
        onSelectTrack={this.handleSelectTrack}
        onPlexMix={this.handlePlexMix}
        onRateTrack={this.handleRateTrack}
      />
    )
  }
}

export default connect((state, props) => {
  const {playlistId} = props

  // select state
  const allTracks = selectAllTracks.values(state)
  const allPlaylistTracks = getAllPlaylistTracks(state)
  const allPlaylists = getAllPlaylists(state)

  // get playlistTracks
  const playlistTrackIds = allPlaylistTracks.get(playlistId) || []
  const playlistTracks = playlistTrackIds.map((id) => allTracks.get(id))

  // get playlist
  const playlist = allPlaylists.get(playlistId)

  return {
    playlist,
    playlistTracks,
  }
})(PlaylistContainer)
