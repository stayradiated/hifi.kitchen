import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ArtistInfo from '../../components/ArtistInfo'

import {
  fetchArtist,
  selectAllArtists,
} from '../../stores/artists/all'

class ArtistContainer extends Component {
  static propTypes = {
    artistId: PropTypes.number.isRequired,
    artist: PropTypes.shape({}),
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.fetchArtist(this.props.artistId)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.artistId !== this.props.artistId) {
      this.fetchArtist(nextProps.artistId)
    }
  }

  fetchArtist (artistId) {
    const {dispatch} = this.props
    dispatch(fetchArtist(artistId))
  }

  render () {
    const {artist} = this.props

    if (artist == null) {
      return null
    }

    return (
      <ArtistInfo
        artist={artist}
        onPlexMix={this.handlePlexMix}
      />
    )
  }
}

export default connect((state, props) => {
  const {artistId} = props

  // get artist
  const allArtists = selectAllArtists.values(state)
  const artist = allArtists.get(artistId)

  return {
    artist,
  }
})(ArtistContainer)
