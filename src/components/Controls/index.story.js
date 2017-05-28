import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import Wrapper from '../../stories/Wrapper'
import {tracks} from '../../stories/data'

import Controls from './index'

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

