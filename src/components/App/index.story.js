import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'
import {albums, artists, playlists, search} from '../../stories/data'

import App from './index'

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

