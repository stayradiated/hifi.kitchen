import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import ArtistGrid from '../../components/ArtistGrid'

import {
  fetchLibraryArtistsRange,
  selectLibraryArtists,
} from '../../stores/library/artists'

import {
  selectAllArtists,
} from '../../stores/artists/all'

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
  const {section, id} = params

  const librarySectionId = section ? parseInt(section, 10) : null

  const allArtists = selectAllArtists.values(state)
  const artists = (selectLibraryArtists.values(state).get(librarySectionId) || [])
    .map((artistId) => allArtists.get(artistId))

  const artistId = id ? parseInt(id, 10) : null
  const totalArtists = selectLibraryArtists.total(state)

  return {
    librarySectionId,
    artistId,
    artists,
    totalArtists,
  }
})(ArtistsRoute)
