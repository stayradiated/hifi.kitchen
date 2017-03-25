import React from 'react'
import {storiesOf} from '@kadira/storybook'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import Wrapper from '../../stories/Wrapper'
import {search, albums, artists, playlists, tracks} from '../../stories/data'

import Browser, {SEARCH} from './index'

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

