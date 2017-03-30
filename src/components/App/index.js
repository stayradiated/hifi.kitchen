import React, {PropTypes} from 'react'

import './styles.css'

import ControlsContainer from '../../containers/Controls'
import QueueContainer from '../../containers/Queue'

import {SEARCH} from '../NavBar'
import Browser from '../Browser'

function App (props) {
  const {
    search, onChangeSearchQuery,
    libraryAlbumIds, libraryArtistIds, libraryPlaylistIds,
    allAlbums, allArtists, allPlaylists, allTracks,
    allArtistAlbums, allAlbumTracks, allPlaylistTracks,
    item, section,
    onChangeItem, onChangeSection, onLoadItems, onLoadItemChildren,
    onRateTrack, displayQueue,
    trackId, onChangeTrack,
  } = props

  const albums = libraryAlbumIds.map((id) => allAlbums.get(id))
  const artists = libraryArtistIds.map((id) => allArtists.get(id))
  const playlists = libraryPlaylistIds.map((id) => allPlaylists.get(id))

  return (
    <div className='App'>
      <div className='App-main'>
        <div className='App-browser'>
          <Browser
            item={item}
            section={section}
            currentlyPlayingTrackId={trackId}
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
              [SEARCH]: search,
              Albums: albums,
              Artists: artists,
              Playlists: playlists,
            }}
            onChangeItem={onChangeItem}
            onChangeSection={onChangeSection}
            onChangeTrack={onChangeTrack}
            onLoadItems={onLoadItems}
            onLoadItemChildren={onLoadItemChildren}
            onRateTrack={onRateTrack}
            onChangeSearchQuery={onChangeSearchQuery}
          />
        </div>
        {displayQueue &&
          <div className='App-queue'>
            <QueueContainer />
          </div>}
      </div>
      <ControlsContainer />
    </div>
  )
}

App.propTypes = {
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

  search: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeSearchQuery: PropTypes.func,

  onLoadItems: PropTypes.func,
  onLoadItemChildren: PropTypes.func,
  onRateTrack: PropTypes.func.isRequired,

  item: PropTypes.shape({}),
  onChangeItem: PropTypes.func,

  section: PropTypes.string,
  onChangeSection: PropTypes.func,

  trackId: PropTypes.number,
  onChangeTrack: PropTypes.func,

  displayQueue: PropTypes.bool,
}

export default App
