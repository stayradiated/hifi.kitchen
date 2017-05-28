import React from 'react'
import {storiesOf} from '@storybook/react'

import Wrapper from '../../stories/Wrapper'
import {tracks} from '../../stories/data'

import TrackTable from './index'

storiesOf('TrackTable', module)
  .addDecorator(Wrapper)
  .add('Default', () => (
    <div style={{flex: 1, overflow: 'hidden'}}>
      <TrackTable
        tracks={tracks}
      />
    </div>
  ))

