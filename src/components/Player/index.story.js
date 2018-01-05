import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import Wrapper from '../../stories/Wrapper'
import { values, tracks } from '../../stories/data'

import Player from './index'

const items = tracks.map((track, index) => ({
  id: index,
  track: track.id
}))
const item = items[5]

const StatefulPlayer = compose(
  withState('selectedTrackId', 'setSelectedTrackId', item.track),
  withHandlers({
    onChange: (props) => (item) => {
      const { setSelectedTrackId } = props
      setSelectedTrackId(item.track)
    }
  })
)(Player)

storiesOf('Player', module)
  .addDecorator(Wrapper)
  .add('Default', () => (
    <StatefulPlayer
      values={values}
      items={items}
      onChange={action('Player Change')}
      onSort={action('Player Sort')}
    />
  ))
