import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import ArtistGrid from '../../components/ArtistGrid'

import {fetchLibraryArtistsRange} from '../../stores/library/artists/actions'

import {values as getAllArtists} from '../../stores/artists/all/selectors'
import * as selectLibraryArtists from '../../stores/library/artists/selectors'

class ArtistsRoute extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalArtists: PropTypes.number.isRequired,
    librarySectionId: PropTypes.number.isRequired,
    artistId: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.fetchArtists = this.fetchArtists.bind(this)
  }

  componentWillMount () {
    const {artists} = this.props
    if (artists.length === 0) {
      this.fetchArtists(0, 20)
    }
  }

  fetchArtists (start, end) {
    const {librarySectionId, dispatch} = this.props
    dispatch(fetchLibraryArtistsRange(librarySectionId, start, end))
  }

  render () {
    const {librarySectionId, artistId, artists, totalArtists} = this.props

    return (
      <ArtistGrid
        artists={artists}
        artistId={artistId}
        librarySectionId={librarySectionId}
        onLoad={this.fetchArtists}
        total={totalArtists}
      />
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section, id: artistId} = params

  const allArtists = getAllArtists(state)

  return {
    artists: selectLibraryArtists.values(state).map((id) => allArtists.get(id)),
    totalArtists: selectLibraryArtists.total(state),
    librarySectionId: section ? parseInt(section, 10) : null,
    artistId: artistId ? parseInt(artistId, 10) : null,
  }
})(ArtistsRoute)
