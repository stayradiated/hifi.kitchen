import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ScaleLoader from 'halogen/ScaleLoader'

import './styles.css'

import ArtistGrid from '../../components/ArtistGrid'

import {fetchLibraryArtists} from '../../stores/library/artists/actions'

import {values as getAllArtists} from '../../stores/artists/all/selectors'
import * as selectLibraryArtists from '../../stores/library/artists/selectors'

class ArtistsRoute extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    loadingArtists: PropTypes.bool.isRequired,
    librarySectionId: PropTypes.number.isRequired,
    artistId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.fetchArtists = this.fetchArtists.bind(this)
  }

  componentWillMount () {
    this.fetchArtists()
  }

  fetchArtists () {
    const {librarySectionId, dispatch} = this.props
    dispatch(fetchLibraryArtists(librarySectionId, 50))
  }

  render () {
    const {librarySectionId, artistId, artists, loadingArtists} = this.props

    return (
      <div className='ArtistsRoute'>
        <ArtistGrid
          artists={artists}
          artistId={artistId}
          librarySectionId={librarySectionId}
        />
        <div className='ArtistsRoute-loadMore'>
          {loadingArtists
              ? <ScaleLoader color='rgba(255, 255, 255, 0.5)' />
              : <button className='ArtistsRoute-loadMoreButton' onClick={this.fetchArtists}>Fetch Artists</button>}
        </div>
      </div>
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section, id: artistId} = params

  const allArtists = getAllArtists(state)

  return {
    artists: selectLibraryArtists.value(state).map((id) => allArtists.get(id)),
    loadingArtists: !!selectLibraryArtists.promise(state),
    librarySectionId: section ? parseInt(section, 10) : null,
    artistId: artistId ? parseInt(artistId, 10) : null,
  }
})(ArtistsRoute)
