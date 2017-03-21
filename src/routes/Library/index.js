import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import lifecycle from 'recompose/lifecycle'
import withState from 'recompose/withState'

import App from '../../components/App'

import {
  fetchCurrentLibraryAlbumsRange,
  selectLibraryAlbums,
} from '../../stores/library/albums'
import {
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

function componentWillMount () {
  const {onChangeSection, section} = this.props
  onChangeSection(section)
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

const handleChangeSection = (props) => (section) => {
  const {onChangeSection} = props

  handleLoadItems(props)(section, 0, 30)

  return onChangeSection(section)
}

const handleChangeItem = (props) => (item) => {
  const {dispatch, onChangeItem} = props
  switch (item && item._type) {
    case 'album':
      dispatch(fetchAlbumTracks(item.id, 0, 15))
      break
    case 'artist':
      dispatch(fetchArtistAlbums(item.id, 0, 100)).then((getState) => {
        const state = getState()
        const artistAlbumIds = selectAllArtistAlbums.values(state).get(item.id)
        artistAlbumIds.forEach((id) => dispatch(fetchAlbumTracks(id, 0, 100)))
      })
      break
    case 'playlist':
      dispatch(fetchPlaylistTracks(item.id, 0, 15))
      break
    default:
      break
  }
  return onChangeItem(item)
}

const handleRateTrack = (props) => (trackId, rating) => {
  const {dispatch} = props
  dispatch(rateTrack(trackId, rating))
}

function Library (props) {
  const {
    libraryAlbumIds, libraryArtistIds, libraryPlaylistIds,
    allAlbums, allArtists, allPlaylists, allTracks,
    allAlbumTracks, allArtistAlbums, allPlaylistTracks,
    item, section, trackId, displayQueue,
    onLoadItems, onLoadItemChildren, onChangeItem, onChangeSection,
    onChangeTrack, setDisplayQueue,
    onRateTrack,
  } = props

  return (
    <App
      libraryAlbumIds={libraryAlbumIds}
      allAlbums={allAlbums}
      libraryArtistIds={libraryArtistIds}
      allArtists={allArtists}
      allArtistAlbums={allArtistAlbums}
      libraryPlaylistIds={libraryPlaylistIds}
      allPlaylists={allPlaylists}
      allPlaylistTracks={allPlaylistTracks}
      allTracks={allTracks}
      allAlbumTracks={allAlbumTracks}
      search={[]}
      queue={[]}
      item={item}
      section={section}
      trackId={trackId}
      displayQueue={displayQueue}
      onLoadItems={onLoadItems}
      onLoadItemChildren={onLoadItemChildren}
      onRateTrack={onRateTrack}
      onChangeItem={onChangeItem}
      onChangeSection={onChangeSection}
      onChangeTrack={onChangeTrack}
      setDisplayQueue={setDisplayQueue}
    />
  )
}

Library.propTypes = {
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

  onLoadItems: PropTypes.func.isRequired,
  onLoadItemChildren: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,

  item: PropTypes.shape({}),
  onChangeItem: PropTypes.func,

  section: PropTypes.string,
  onChangeSection: PropTypes.func,

  trackId: PropTypes.number,
  onChangeTrack: PropTypes.func,

  displayQueue: PropTypes.bool,
  setDisplayQueue: PropTypes.func,
}

export default compose(
  connect((state) => ({
    libraryAlbumIds: selectLibraryAlbums.currentIds(state),
    libraryArtistIds: selectLibraryArtists.currentIds(state),
    libraryPlaylistIds: selectLibraryPlaylists.currentIds(state),
    allAlbums: selectAllAlbums.values(state),
    allArtists: selectAllArtists.values(state),
    allArtistAlbums: selectAllArtistAlbums.values(state),
    allPlaylists: selectAllPlaylists.values(state),
    allPlaylistTracks: selectAllPlaylistTracks.values(state),
    allTracks: selectAllTracks.values(state),
    allAlbumTracks: selectAllAlbumTracks.values(state),
  })),
  withState('section', 'onChangeSection', 'Albums'),
  withState('item', 'onChangeItem', null),
  withState('trackId', 'onChangeTrack', null),
  withState('displayQueue', 'setDisplayQueue', false),
  withHandlers({
    onLoadItems: handleLoadItems,
    onLoadItemChildren: handleLoadItemChildren,
    onChangeItem: handleChangeItem,
    onChangeSection: handleChangeSection,
    onRateTrack: handleRateTrack,
  }),
  lifecycle({
    componentWillMount,
  }),
)(Library)
