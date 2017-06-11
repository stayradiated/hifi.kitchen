import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Wrapper from '../../stories/Wrapper'
import {playlistIds, values} from '../../stories/data'

import Modal from './index'
import PlaylistList from '../PlaylistList'

storiesOf('Modal', module)
  .addDecorator(Wrapper)
  .add('Playlists', () => (
    <Modal>
      <PlaylistList
        playlistIds={playlistIds}
        values={values}
        onSelectPlaylist={action('onSelectPlaylist')}
        onLoadItems={action('onLoadItems')}
      />
    </Modal>
  ))

