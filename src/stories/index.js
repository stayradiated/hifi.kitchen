import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import Wrapper from './Wrapper'

import App from '../components/App'
import Browser from '../components/Browser'
import Controls from '../components/Controls'
import LoginForm from '../components/LoginForm'
import NavBar, {SEARCH} from '../components/NavBar'
import Queue from '../components/Queue'
import SearchResults from '../components/SearchResults'
import Settings from '../components/Settings'
import SoundBars from '../components/SoundBars'
import TypedGrid from '../components/TypedGrid'
import TypedPanel from '../components/TypedPanel'
import WebAudio from '../components/WebAudio'
import RatingBars from '../components/RatingBars'

import albums from '../../data/albums.json'
import artists from '../../data/artists.json'
import playlists from '../../data/playlists.json'
import servers from '../../data/servers.json'
import libraries from '../../data/libraries.json'
import tracks from '../../data/tracks.json'
import search from '../../data/search.json'

storiesOf('Icon', module)
  .addDecorator(Wrapper)
  .add('SoundBars', () => (
    <SoundBars />
  ))

const StatefulNavBar = (
  withState('currentSection', 'onChangeSection', 'Albums')
)(NavBar)

storiesOf('NavBar', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <StatefulNavBar
      sections={['Playlists', 'Artists', 'Albums', 'Tracks']}
      onChange={action('On Change')}
    />
  ))

storiesOf('Grid', module)
  .addDecorator(Wrapper)
  .add('of Albums', () => (
    <TypedGrid
      items={albums}
      onChange={action('Select Item')}
    />
  ))
  .add('of Artists', () => (
    <TypedGrid
      items={artists}
      onChange={action('Select Item')}
    />
  ))

storiesOf('SearchResults', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <SearchResults
      query='Young'
      hubs={search}
      onChange={action('onChange')}
    />
  ))

storiesOf('Panel', module)
  .addDecorator(Wrapper)
  .add('Album', () => (
    <TypedPanel
      item={albums[0]}
      currentlyPlayingTrackId={albums[0].tracks[4].id}
      onClickSubtitle={action('Click Subtitle')}
      onClickMeta={action('Click Meta')}
      onClose={action('Close Panel')}
      onSelectTrack={action('Change Track')}
    />
  ))
  .add('Artist', () => (
    <TypedPanel
      item={artists[0]}
      currentlyPlayingTrackId={artists[0].albums[0].tracks[4].id}
      onClickSubtitle={action('Click Subtitle')}
      onClickMeta={action('Click Meta')}
      onClose={action('Close Panel')}
      onSelectTrack={action('Change Track')}
    />
  ))
  .add('Playlist', () => (
    <TypedPanel
      item={playlists[0]}
      currentlyPlayingTrackId={playlists[0].tracks[4].id}
      onClickSubtitle={action('Click Subtitle')}
      onClickMeta={action('Click Meta')}
      onClose={action('Close Panel')}
      onSelectTrack={action('Change Track')}
    />
  ))

const StatefulBrowser = compose(
  withState('section', 'onChangeSection', 'Albums'),
  withState('item', 'onChangeItem', null),
  withState('searchQuery', 'onChangeSearchQuery', 'Young'),
)(Browser)

storiesOf('Browser', module)
  .addDecorator(Wrapper)
  .add('Albums & Artists', () => (
    <StatefulBrowser
      sections={{
        [SEARCH]: search,
        Albums: albums,
        Artists: artists,
        Playlists: playlists,
        Tracks: tracks,
      }}
    />
  ))

const StatefulSettings = compose(
  withState('selectedServerId', 'onSelectServer', servers[1].id),
  withState('selectedLibraryId', 'onSelectLibrary', libraries[1].id),
)(Settings)

storiesOf('Settings', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <StatefulSettings
      servers={servers}
      libraries={libraries}
    />
  ))

storiesOf('Login Form', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <LoginForm
      onSubmit={action('Submit Form')}
      errorMessage='Authentication failed'
    />
  ))

storiesOf('Queue', module)
  .addDecorator(Wrapper)
  .add('Full', () => (
    <Queue
      tracks={playlists[4].tracks}
      selectedIndex={5}
      onChange={action('Queue Change')}
      onSort={action('Queue Sort')}
    />
  ))

const StatefulControls = compose(
  withState('paused', 'setPaused', false),
  withHandlers({
    onPlay: (props) => () => {
      action('Play')()
      props.setPaused(false)
    },
    onPause: (props) => () => {
      action('Pause')()
      props.setPaused(true)
    },
  })
)(Controls)

storiesOf('Controls', module)
  .addDecorator(Wrapper)
  .add('Basic', () => (
    <StatefulControls
      track={tracks[49]}
      audio={{
        currentTime: 60 * 2,
        buffered: 60 * 3,
        duration: 60 * 4,
      }}
      onPrev={action('Prev')}
      onNext={action('Next')}
      onQueue={action('Queue')}
    />
  ))

storiesOf('App', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <App
      albums={albums}
      artists={artists}
      playlists={playlists}
      search={search}
      queue={playlists[4].tracks}
    />
  ))

storiesOf('WebAudio', module)
  .addDecorator(Wrapper)
  .add('Web Audio', () => {
    const track = tracks[49]

    return (
      <WebAudio
        source={track.mediaPath}
        duration={track.duration / 1000}
      >
        {({currentTime, buffered, duration, paused, onPause, onPlay}) => (
          <Controls
            track={track}
            audio={{
              currentTime,
              buffered,
              duration,
            }}
            paused={paused}
            onPause={onPause}
            onPlay={onPlay}
            onPrev={action('Prev')}
            onNext={action('Next')}
            onQueue={action('Queue')}
          />
        )}
      </WebAudio>
    )
  })

storiesOf('RatingBars', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <RatingBars
      style={{width: '1000px', height: '100px'}}
      value={7}
      maxValue={10}
    />
  ))
