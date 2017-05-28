import React from 'react'
import {storiesOf} from '@storybook/react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import Wrapper from '../../stories/Wrapper'
import {servers, libraries} from '../../stories/data'

import Settings from './index'

const StatefulSettings = compose(
  withState('selectedServerId', 'onSelectServer', servers[1].id),
  withState('selectedLibraryId', 'onSelectLibrary', libraries[1].id),
)(Settings)

storiesOf('Settings', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <StatefulSettings
      servers={servers}
      libraries={libraries}
    />
  ))

