import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ScaleLoader from 'halogen/ScaleLoader'

import './styles.css'

import PlaylistGrid from '../../components/PlaylistGrid'

import {fetchLibraryPlaylists} from '../../stores/library/playlists/actions'

import {values as getAllPlaylists} from '../../stores/playlists/all/selectors'
import * as selectLibraryPlaylists from '../../stores/library/playlists/selectors'

class PlaylistsRoute extends Component {
  static propTypes = {
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadingPlaylists: PropTypes.bool.isRequired,
    librarySectionId: PropTypes.number.isRequired,
    playlistId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.fetchPlaylists = this.fetchPlaylists.bind(this)
  }

  componentWillMount () {
    this.fetchPlaylists()
  }

  fetchPlaylists () {
    const {librarySectionId, dispatch} = this.props
    dispatch(fetchLibraryPlaylists(librarySectionId, 50))
  }

  render () {
    const {librarySectionId, playlistId, playlists, loadingPlaylists} = this.props

    return (
      <div className='PlaylistsRoute'>
        <PlaylistGrid
          playlists={playlists}
          playlistId={playlistId}
          librarySectionId={librarySectionId}
        />
        <div className='PlaylistsRoute-loadMore'>
          {loadingPlaylists
              ? <ScaleLoader color='rgba(255, 255, 255, 0.5)' />
              : <button className='PlaylistsRoute-loadMoreButton' onClick={this.fetchPlaylists}>Fetch Playlists</button>}
        </div>
      </div>
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section, id: playlistId} = params

  const allPlaylists = getAllPlaylists(state)

  return {
    playlists: selectLibraryPlaylists.value(state).map((id) => allPlaylists.get(id)),
    loadingPlaylists: !!selectLibraryPlaylists.promise(state),
    librarySectionId: section ? parseInt(section, 10) : null,
    playlistId: playlistId ? parseInt(playlistId, 10) : null,
  }
})(PlaylistsRoute)
