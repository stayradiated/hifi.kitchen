import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'

import {ARTIST, ALBUM, PLAYLIST, TRACK, SEARCH} from '../../stores/constants'

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
  sortLibraryArtists,
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
  sortLibraryPlaylists,
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
  fetchCurrentLibraryTracksRange,
  selectLibraryTracks,
  sortLibraryTracks,
} from '../../stores/library/tracks'
import {
  createQueueFromArtist,
  createQueueFromAlbum,
  createQueueFromPlaylist,
  createQueueFromTrack,
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
    onChangeSection(ALBUM)
  } else if (prevSection !== section) {
    onLoadItems(section, 0, 30)
  }

  if (prevItemType !== itemType || prevItemId !== itemId) {
    switch (itemType) {
      case ALBUM:
        dispatch(fetchAlbum(itemId))
        dispatch(fetchAlbumTracks(itemId, 0, 15))
        break
      case ARTIST:
        dispatch(fetchArtist(itemId))
        dispatch(fetchArtistAlbums(itemId, 0, 100)).then((getState) => {
          const state = getState()
          const artistAlbumIds = selectAllArtistAlbums.values(state).get(itemId)
          artistAlbumIds.forEach((id) => dispatch(fetchAlbumTracks(id, 0, 100)))
        })
        break
      case PLAYLIST:
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
    case ALBUM:
      return dispatch(fetchCurrentLibraryAlbumsRange(start, end))
    case ARTIST:
      return dispatch(fetchCurrentLibraryArtistsRange(start, end))
    case PLAYLIST:
      return dispatch(fetchCurrentLibraryPlaylistsRange(start, end))
    case TRACK:
      return dispatch(fetchCurrentLibraryTracksRange(start, end))
    case SEARCH:
      return
    default:
      console.error(`Could not load items for section: ${section}`)
  }
}

const handleLoadItemChildren = (props) => (item, start, end) => {
  const {dispatch} = props
  switch (item._type) {
    case ALBUM:
      dispatch(fetchAlbumTracks(item.id, start, end))
      break
    case PLAYLIST:
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

const handleCreateQueue = (props) => (parentType, parentId, trackId) => {
  const {dispatch} = props
  switch (parentType) {
    case ALBUM:
      dispatch(createQueueFromAlbum(parentId, trackId))
      break
    case ARTIST:
      dispatch(createQueueFromArtist(parentId, trackId))
      break
    case PLAYLIST:
      dispatch(createQueueFromPlaylist(parentId, trackId))
      break
    case TRACK:
      dispatch(createQueueFromTrack(parentId))
      break
    default:
      console.warn('Could not create queue', {parentType, parentId, trackId})
      break
  }
}

const handleChangeSearchQuery = (props) => (query) => {
  const {dispatch} = props
  dispatch(search(query, 10))
}

const handleChangeSortBy = (props) => (sortBy) => {
  const {section, dispatch, sortBy: prevSortBy, sortDesc: prevSortDesc} = props
  const sortDesc = sortBy === prevSortBy && !prevSortDesc
  switch (section) {
    case ALBUM:
      dispatch(sortLibraryAlbums(sortBy, sortDesc))
      break
    case ARTIST:
      dispatch(sortLibraryArtists(sortBy, sortDesc))
      break
    case PLAYLIST:
      dispatch(sortLibraryPlaylists(sortBy, sortDesc))
      break
    case TRACK:
      dispatch(sortLibraryTracks(sortBy, sortDesc))
      break
    default:
      console.error('Could not sort based on section:', section)
  }
  handleLoadItems(props)(section, 0, 30)
}


const BrowserContainer = (props) => {
  const {
    section, itemType, itemId,
    searchResults, onChangeSearchQuery,
    libraryAlbumIds, libraryArtistIds, libraryPlaylistIds, libraryTrackIds,
    allAlbums, allArtists, allPlaylists, allTracks,
    allArtistAlbums, allAlbumTracks, allPlaylistTracks,
    playerState,
    onChangeItem, onChangeSection, onLoadItems, onLoadItemChildren,
    sortBy, sortDesc, sortOptions, onChangeSortBy,
    onRateTrack,
    trackId, onCreateQueue,
  } = props

  let item = null
  switch (itemType) {
    case null:
      item = null
      break
    case ARTIST:
      item = allArtists.get(itemId)
      break
    case ALBUM:
      item = allAlbums.get(itemId)
      break
    case PLAYLIST:
      item = allPlaylists.get(itemId)
      break
    default:
      console.error('Cannot set item based on itemType:', itemType)
      item = null
  }

  let sectionItems = null
  switch (section) {
    case SEARCH:
      sectionItems = searchResults
      break
    case ALBUM:
      sectionItems = libraryAlbumIds.map((id) => allAlbums.get(id))
      break
    case ARTIST:
      sectionItems = libraryArtistIds.map((id) => allArtists.get(id))
      break
    case PLAYLIST:
      sectionItems = libraryPlaylistIds.map((id) => allPlaylists.get(id))
      break
    case TRACK:
      sectionItems = libraryTrackIds.map((id) => allTracks.get(id))
      break
    default:
      console.error('Cannot set sectionItems based on section:', section)
      sectionItems = []
  }

  return (
    <Browser
      item={item}
      section={section}
      sectionItems={sectionItems}
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
      navBarSections={{
        [SEARCH]: 'Search',
        [ALBUM]: 'Albums',
        [ARTIST]: 'Artists',
        [PLAYLIST]: 'Playlists',
        [TRACK]: 'Tracks',
      }}
      playerState={playerState}
      onChangeItem={onChangeItem}
      onChangeSection={onChangeSection}
      onCreateQueue={onCreateQueue}
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
  libraryTrackIds: PropTypes.arrayOf(PropTypes.number),

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
  onCreateQueue: PropTypes.func,

  playerState: PropTypes.string,
}

export default compose(
  connect((state, props) => {
    const {section} = props

    let sortBy
    let sortDesc
    let sortOptions
    switch (section) {
      case ALBUM:
        sortBy = selectLibraryAlbums.sortBy(state)
        sortDesc = selectLibraryAlbums.sortDesc(state)
        sortOptions = selectLibraryAlbums.sortOptions(state)
        break
      case ARTIST:
        sortBy = selectLibraryArtists.sortBy(state)
        sortDesc = selectLibraryArtists.sortDesc(state)
        sortOptions = selectLibraryArtists.sortOptions(state)
        break
      case PLAYLIST:
        sortBy = selectLibraryPlaylists.sortBy(state)
        sortDesc = selectLibraryPlaylists.sortDesc(state)
        sortOptions = selectLibraryPlaylists.sortOptions(state)
        break
      case TRACK:
        sortBy = selectLibraryTracks.sortBy(state)
        sortDesc = selectLibraryTracks.sortDesc(state)
        sortOptions = selectLibraryTracks.sortOptions(state)
        break
      default:
        sortBy = null
        sortDesc = false
        sortOptions = []
    }

    return {
      trackId: selectQueue.trackId(state),
      libraryAlbumIds: selectLibraryAlbums.currentIds(state),
      libraryArtistIds: selectLibraryArtists.currentIds(state),
      libraryPlaylistIds: selectLibraryPlaylists.currentIds(state),
      libraryTrackIds: selectLibraryTracks.currentIds(state),
      displayQueue: selectDisplayQueue(state),
      playerState: selectTimeline.playerState(state),
      allAlbums: selectAllAlbums.values(state),
      allArtists: selectAllArtists.values(state),
      allArtistAlbums: selectAllArtistAlbums.values(state),
      allPlaylists: selectAllPlaylists.values(state),
      allPlaylistTracks: selectAllPlaylistTracks.values(state),
      allTracks: selectAllTracks.values(state),
      allAlbumTracks: selectAllAlbumTracks.values(state),
      sortBy,
      sortDesc,
      sortOptions,
      searchResults: [
        {title: 'Albums', items: selectSearch.albums(state)},
        {title: 'Artists', items: selectSearch.artists(state)},
        {title: 'Playlists', items: selectSearch.playlists(state)},
        {title: 'Tracks', items: selectSearch.tracks(state)},
      ],
    }
  }),
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
