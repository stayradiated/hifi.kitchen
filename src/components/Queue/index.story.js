import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'
import {playlists} from '../../stories/data'

import Queue from './index'

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

