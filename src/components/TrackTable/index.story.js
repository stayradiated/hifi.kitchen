import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Wrapper from '../../stories/Wrapper'
import {tracks} from '../../stories/data'

import TrackTable from './index'

storiesOf('TrackTable', module)
  .addDecorator(Wrapper)
  .add('Default', () => (
    <div style={{flex: 1, overflow: 'hidden'}}>
      <TrackTable
        tracks={tracks}
        onLoad={action('onLoad')}
        onChange={action('onChange')}
        onRate={action('onRate')}
      />
    </div>
  ))

