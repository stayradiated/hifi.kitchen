import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'

import {
  fetchCurrentLibraryAlbumsRange,
  selectLibraryAlbums,
  sortLibraryAlbums,
} from '../../stores/library/albums'
import {
  fetchAlbum,
  selectAllAlbums,
} from '../../stores/albums/all'
import {
  fetchAlbumTracks,
  selectAllAlbumTracks,
} from '../../stores/albums/tracks'
import {
  fetchCurrentLibraryArtistsRange,
  selectLibraryArtists,
} from '../../stores/library/artists'
import {
  fetchArtist,
  selectAllArtists,
} from '../../stores/artists/all'
import {
  fetchArtistAlbums,
  selectAllArtistAlbums,
} from '../../stores/artists/albums'
import {
  fetchCurrentLibraryPlaylistsRange,
  selectLibraryPlaylists,
} from '../../stores/library/playlists'
import {
  selectAllPlaylists,
} from '../../stores/playlists/all'
import {
  fetchPlaylistTracks,
  selectAllPlaylistTracks,
} from '../../stores/playlists/tracks'
import {
  rateTrack,
  selectAllTracks,
} from '../../stores/tracks/all'
import {
  createQueueFromArtist,
  createQueueFromAlbum,
  createQueueFromPlaylist,
} from '../../stores/queue/actions'
import * as selectQueue from '../../stores/queue/selectors'
import {
  search,
} from '../../stores/search/actions'
import selectSearch from '../../stores/search/selectors'
import {
  selectDisplayQueue,
} from '../../stores/ui'
import * as selectTimeline from '../../stores/timeline/selectors'

import Browser from '../../components/Browser'
import {SEARCH} from '../../components/NavBar'

const receiveProps = (prevProps, props) => {
  const {
    dispatch, onChangeSection, onLoadItems, section, itemId, itemType,
  } = props
  const {
    section: prevSection,
    itemId: prevItemId,
    itemType: prevItemType,
  } = prevProps

  if (section == null) {
    onChangeSection('Albums')
  } else if (prevSection !== section) {
    onLoadItems(section, 0, 30)
  }

  if (prevItemType !== itemType || prevItemId !== itemId) {
    switch (itemType) {
      case 'album':
        dispatch(fetchAlbum(itemId))
        dispatch(fetchAlbumTracks(itemId, 0, 15))
        break
      case 'artist':
        dispatch(fetchArtist(itemId))
        dispatch(fetchArtistAlbums(itemId, 0, 100)).then((getState) => {
          const state = getState()
          const artistAlbumIds = selectAllArtistAlbums.values(state).get(itemId)
          artistAlbumIds.forEach((id) => dispatch(fetchAlbumTracks(id, 0, 100)))
        })
        break
      case 'playlist':
        dispatch(fetchPlaylistTracks(itemId, 0, 15))
        break
      default:
        break
    }
  }
}

function componentWillMount () {
  receiveProps({}, this.props)
}

function componentWillReceiveProps (nextProps) {
  receiveProps(this.props, nextProps)
}

const handleLoadItems = (props) => (section, start, end) => {
  const {dispatch} = props

  switch (section) {
    case 'Albums':
      return dispatch(fetchCurrentLibraryAlbumsRange(start, end))
    case 'Artists':
      return dispatch(fetchCurrentLibraryArtistsRange(start, end))
    case 'Playlists':
      return dispatch(fetchCurrentLibraryPlaylistsRange(start, end))
    default:
      console.error(`Could not load items for section: ${section}`)
  }
}

const handleLoadItemChildren = (props) => (item, start, end) => {
  const {dispatch} = props
  switch (item._type) {
    case 'album':
      dispatch(fetchAlbumTracks(item.id, start, end))
      break
    case 'playlist':
      dispatch(fetchPlaylistTracks(item.id, start, end))
      break
    default:
      break
  }
}

const handleRateTrack = (props) => (trackId, rating) => {
  const {dispatch} = props
  dispatch(rateTrack(trackId, rating))
}

const handleCreateQueue = (props) => (parent, track) => {
  const {dispatch} = props
  switch (parent._type) {
    case 'album':
      dispatch(createQueueFromAlbum(parent, track))
      break
    case 'artist':
      dispatch(createQueueFromArtist(parent, track))
      break
    case 'playlist':
      dispatch(createQueueFromPlaylist(parent.id, track))
      break
    default:
      console.warn('Could not create queue', {parent, track})
      break
  }
}

const handleChangeSearchQuery = (props) => (query) => {
  const {dispatch} = props
  dispatch(search(query, 10))
}

const handleChangeSortBy = (props) => (sortBy) => {
  const {section, dispatch, sortBy: prevSortBy, sortDesc} = props
  dispatch(sortLibraryAlbums(sortBy, sortBy === prevSortBy && !sortDesc))
  handleLoadItems(props)(section, 0, 30)
}


const BrowserContainer = (props) => {
  const {
    section, itemType, itemId,
    searchResults, onChangeSearchQuery,
    libraryAlbumIds, libraryArtistIds, libraryPlaylistIds,
    allAlbums, allArtists, allPlaylists, allTracks,
    allArtistAlbums, allAlbumTracks, allPlaylistTracks,
    playerState,
    onChangeItem, onChangeSection, onLoadItems, onLoadItemChildren,
    sortBy, sortDesc, sortOptions, onChangeSortBy,
    onRateTrack,
    trackId, onChangeTrack,
  } = props

  let item = null
  switch (itemType) {
    case null:
      item = null
      break
    case 'artist':
      item = allArtists.get(itemId)
      break
    case 'album':
      item = allAlbums.get(itemId)
      break
    case 'playlist':
      item = allPlaylists.get(itemId)
      break
    default:
      console.error('Cannot handle itemType', itemType)
      item = null
  }

  const albums = libraryAlbumIds.map((id) => allAlbums.get(id))
  const artists = libraryArtistIds.map((id) => allArtists.get(id))
  const playlists = libraryPlaylistIds.map((id) => allPlaylists.get(id))

  return (
    <Browser
      item={item}
      section={section}
      currentlyPlayingTrackId={trackId}
      sortBy={sortBy}
      sortDesc={sortDesc}
      sortOptions={sortOptions}
      values={{
        albums: allAlbums,
        artists: allArtists,
        artistAlbums: allArtistAlbums,
        playlists: allPlaylists,
        playlistTracks: allPlaylistTracks,
        tracks: allTracks,
        albumTracks: allAlbumTracks,
      }}
      sections={{
        [SEARCH]: searchResults,
        Albums: albums,
        Artists: artists,
        Playlists: playlists,
      }}
      playerState={playerState}
      onChangeItem={onChangeItem}
      onChangeSection={onChangeSection}
      onChangeTrack={onChangeTrack}
      onLoadItems={onLoadItems}
      onLoadItemChildren={onLoadItemChildren}
      onRateTrack={onRateTrack}
      onChangeSearchQuery={onChangeSearchQuery}
      onChangeSortBy={onChangeSortBy}
    />
  )
}

BrowserContainer.propTypes = {
  libraryAlbumIds: PropTypes.arrayOf(PropTypes.number),
  libraryArtistIds: PropTypes.arrayOf(PropTypes.number),
  libraryPlaylistIds: PropTypes.arrayOf(PropTypes.number),

  allAlbums: PropTypes.instanceOf(Map),
  allArtists: PropTypes.instanceOf(Map),
  allPlaylists: PropTypes.instanceOf(Map),
  allTracks: PropTypes.instanceOf(Map),

  allAlbumTracks: PropTypes.instanceOf(Map),
  allArtistAlbums: PropTypes.instanceOf(Map),
  allPlaylistTracks: PropTypes.instanceOf(Map),

  sortBy: PropTypes.string,
  sortDesc: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(PropTypes.string),
  onChangeSortBy: PropTypes.func,

  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeSearchQuery: PropTypes.func,

  onLoadItems: PropTypes.func,
  onLoadItemChildren: PropTypes.func,
  onRateTrack: PropTypes.func.isRequired,

  itemType: PropTypes.string,
  itemId: PropTypes.number,
  onChangeItem: PropTypes.func,

  section: PropTypes.string,
  onChangeSection: PropTypes.func,

  trackId: PropTypes.number,
  onChangeTrack: PropTypes.func,

  playerState: PropTypes.string,
}

export default compose(
  connect((state) => ({
    trackId: selectQueue.trackId(state),
    libraryAlbumIds: selectLibraryAlbums.currentIds(state),
    libraryArtistIds: selectLibraryArtists.currentIds(state),
    libraryPlaylistIds: selectLibraryPlaylists.currentIds(state),
    displayQueue: selectDisplayQueue(state),
    playerState: selectTimeline.playerState(state),
    allAlbums: selectAllAlbums.values(state),
    allArtists: selectAllArtists.values(state),
    allArtistAlbums: selectAllArtistAlbums.values(state),
    allPlaylists: selectAllPlaylists.values(state),
    allPlaylistTracks: selectAllPlaylistTracks.values(state),
    allTracks: selectAllTracks.values(state),
    allAlbumTracks: selectAllAlbumTracks.values(state),
    sortBy: selectLibraryAlbums.sortBy(state),
    sortDesc: selectLibraryAlbums.sortDesc(state),
    sortOptions: selectLibraryAlbums.sortOptions(state),
    searchResults: [
      {title: 'Albums', items: selectSearch.albums(state)},
      {title: 'Artists', items: selectSearch.artists(state)},
      {title: 'Playlists', items: selectSearch.playlists(state)},
      {title: 'Tracks', items: selectSearch.tracks(state)},
    ],
  })),
  withHandlers({
    onLoadItems: handleLoadItems,
    onLoadItemChildren: handleLoadItemChildren,
    onRateTrack: handleRateTrack,
    onCreateQueue: handleCreateQueue,
    onChangeSearchQuery: handleChangeSearchQuery,
    onChangeSortBy: handleChangeSortBy,
  }),
  lifecycle({
    componentWillMount,
    componentWillReceiveProps,
  }),
)(BrowserContainer)
