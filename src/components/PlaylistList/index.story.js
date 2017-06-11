import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Wrapper from '../../stories/Wrapper'
import {playlistIds, values} from '../../stories/data'

import PlaylistList from './index'

storiesOf('PlaylistList', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <PlaylistList
      playlistIds={playlistIds}
      values={values}
      onSelectPlaylist={action('onSelectPlaylist')}
      onLoadItems={action('onLoadItems')}
    />
  ))

