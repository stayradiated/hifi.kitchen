import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Wrapper from '../../stories/Wrapper'
import { values, tracks } from '../../stories/data'

import Queue from './index'

const items = tracks.map((track, index) => ({
  id: index,
  track: track.id
}))
const item = items[5]

storiesOf('Queue', module)
  .addDecorator(Wrapper)
  .add('Full', () => (
    <Queue
      allTracks={values}
      items={items}
      selectedItemId={item.track}
      onChange={action('Queue Change')}
      onSort={action('Queue Sort')}
    />
  ))
