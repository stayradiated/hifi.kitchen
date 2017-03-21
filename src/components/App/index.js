import React, {PropTypes} from 'react'
import getContext from 'recompose/getContext'

import './styles.css'

import {SEARCH} from '../NavBar'
import Browser from '../Browser'
import Queue from '../Queue'
import WebAudio from '../WebAudio'
import Controls from '../Controls'

function App (props) {
  const {
    library,
    search,
    libraryAlbumIds, libraryArtistIds, libraryPlaylistIds,
    allAlbums, allArtists, allPlaylists, allTracks,
    allArtistAlbums, allAlbumTracks, allPlaylistTracks,
    item, section,
    onChangeItem, onChangeSection, onLoadItems, onLoadItemChildren,
    onRateTrack,
    displayQueue, setDisplayQueue,
    trackId, onChangeTrack,
    queue,
  } = props

  const track = allTracks.get(trackId)
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
          />
        </div>
        {displayQueue &&
          <div className='App-queue'>
            <Queue
              tracks={queue}
              selectedIndex={5}
            />
          </div>}
      </div>
      {track &&
        <WebAudio
          source={library.trackSrc(track)}
          duration={track.duration / 1000}
        >
          {(audio) => (
            <Controls
              track={track}
              audio={audio}
              paused={audio.paused}
              onPause={audio.onPause}
              onPlay={audio.onPlay}
              onQueue={() => setDisplayQueue(!displayQueue)}
              onRateTrack={onRateTrack}
            />
          )}
        </WebAudio>}
    </div>
  )
}

App.propTypes = {
  library: PropTypes.shape({
    trackSrc: PropTypes.func.isRequired,
  }).isRequired,

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

  onLoadItems: PropTypes.func,
  onLoadItemChildren: PropTypes.func,
  onRateTrack: PropTypes.func.isRequired,

  item: PropTypes.shape({}),
  onChangeItem: PropTypes.func,

  section: PropTypes.string,
  onChangeSection: PropTypes.func,

  trackId: PropTypes.number,
  onChangeTrack: PropTypes.func,

  queue: PropTypes.arrayOf(PropTypes.object),
  displayQueue: PropTypes.bool,
  setDisplayQueue: PropTypes.func,
}

export default getContext({
  library: PropTypes.shape({}),
})(App)
