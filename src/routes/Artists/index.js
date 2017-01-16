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
    artistId: PropTypes.number,
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    dispatch: PropTypes.func.isRequired,
    sectionId: PropTypes.number.isRequired,
    totalArtists: PropTypes.number.isRequired,
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
    const {sectionId, dispatch} = this.props
    dispatch(fetchLibraryArtistsRange(sectionId, start, end))
  }

  render () {
    const {artistId, artists, totalArtists} = this.props

    return (
      <ArtistGrid.withRouter
        items={artists}
        currentId={artistId}
        onLoad={this.fetchArtists}
        total={totalArtists}
        itemPath={(id, {serverId, sectionId}) =>
          `/server/${serverId}/sections/${sectionId}/artists/${id}`}
      />
    )
  }
}

export default connect((state, props) => {
  const {params} = props

  const sectionId = parseInt(params.sectionId, 10) || null
  const artistId = parseInt(params.artistId, 10) || null

  const allArtists = selectAllArtists.values(state)
  const totalArtists = selectLibraryArtists.total(state)
  const artists = (selectLibraryArtists.values(state).get(sectionId) || [])
    .map((id) => allArtists.get(id))


  return {
    artistId,
    artists,
    sectionId,
    totalArtists,
  }
})(ArtistsRoute)
