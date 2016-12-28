import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {fetchArtist} from '../../stores/artists/all/actions'

class ArtistsRoute extends Component {
  static propTypes = {
    artist: PropTypes.shape({}),
    loading: PropTypes.bool.isRequired,
    librarySectionId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.fetchArtist(this.props.artistId)
  }

  componentWillReceiveProps (nextProps) {
    this.fetchArtist(nextProps.artistId)
  }

  fetchArtist () {
    const {dispatch} = this.props
    dispatch()
  }

  render () {
    return (
      <div className='ArtistsRoute'>
        Artists Route
      </div>
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section, id} = params

  const artistId = id ? parseInt(id, 10) : null,
  const librarySectionId = section ? parseInt(section, 10) : null

  const allArtists = getAllArtists(state)

  return {
    artist: selectLibraryArtists.value(state).map((id) => allArtists.get(id)),
    loading: !!selectLibraryArtists.promise(state),
  }
})(ArtistsRoute)
