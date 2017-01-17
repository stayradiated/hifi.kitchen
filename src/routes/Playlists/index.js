import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import './styles.css'

import PlaylistGrid from '../../components/PlaylistGrid'

import {fetchLibraryPlaylistsRange} from '../../stores/library/playlists/actions'

import {values as getAllPlaylists} from '../../stores/playlists/all/selectors'
import * as selectLibraryPlaylists from '../../stores/library/playlists/selectors'

class PlaylistsRoute extends Component {
  static propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalPlaylists: PropTypes.number.isRequired,
    playlistId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.fetchPlaylists = this.fetchPlaylists.bind(this)
  }

  componentWillMount () {
    const {playlists} = this.props
    if (playlists.length === 0) {
      this.fetchPlaylists(0, 20)
    }
  }

  fetchPlaylists (start, end) {
    const {dispatch} = this.props
    dispatch(fetchLibraryPlaylistsRange(start, end))
  }

  render () {
    const {playlistId, playlists, totalPlaylists} = this.props

    return (
      <PlaylistGrid.withRouter
        items={playlists}
        currentId={playlistId}
        onLoad={this.fetchPlaylists}
        total={totalPlaylists}
        itemPath={(id, {serverId}) =>
          `/server/${serverId}/playlists/${id}`}
      />
    )
  }
}

export default connect((state, props) => {
  const {params} = props

  const playlistId = parseInt(params.playlistId, 10) || null

  const allPlaylists = getAllPlaylists(state)
  const totalPlaylists = selectLibraryPlaylists.total(state)
  const playlists = (selectLibraryPlaylists.values(state) || [])
    .map((id) => allPlaylists.get(id))

  return {
    playlistId,
    playlists,
    totalPlaylists,
  }
})(PlaylistsRoute)
