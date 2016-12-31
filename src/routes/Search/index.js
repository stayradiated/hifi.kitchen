import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import './styles.css'

import AlbumGrid from '../../components/AlbumGrid'
import ArtistGrid from '../../components/ArtistGrid'
import PlaylistGrid from '../../components/PlaylistGrid'

import {search} from '../../stores/search/actions'

import * as selectSearch from '../../stores/search/selectors'

class SearchRoute extends Component {
  static propTypes = {
    albums: PropTypes.arrayOf(PropTypes.object).isRequired,
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    params: PropTypes.shape({
      query: PropTypes.string,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handleSearch = this.handleSearch.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown (event) {
    if (event.keyCode === 13) {
      this.handleSearch()
    }
  }

  handleSearch () {
    const {dispatch} = this.props
    const {value} = this.input
    dispatch(search(value))
  }

  render () {
    const {params, albums, artists, playlists} = this.props
    const {query} = params

    return (
      <div className='SearchRoute'>
        <div className='SearchRoute-query'>
          <input
            className='SearchRoute-inputBtn'
            ref={(el) => { this.input = el }}
            onKeyDown={this.handleKeyDown}
          />
          <button
            className='SearchRoute-searchBtn'
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>

        <h2>Search: {query}</h2>

        {albums.length > 0 &&
          <div>
            <h3>Albums</h3>
            <AlbumGrid albums={albums} />
          </div>}

        {artists.length > 0 &&
          <div>
            <h3>Artists</h3>
            <ArtistGrid artists={artists} />
          </div>}

        {playlists.length > 0 &&
          <div>
            <h3>Playlists</h3>
            <PlaylistGrid playlists={playlists} />
          </div>}
      </div>
    )
  }
}

export default connect((state) => ({
  tracks: selectSearch.tracks(state),
  albums: selectSearch.albums(state),
  artists: selectSearch.artists(state),
  playlists: selectSearch.playlists(state),
}))(SearchRoute)
