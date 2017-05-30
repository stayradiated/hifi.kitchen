import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import Wrapper from '../../stories/Wrapper'
import {servers, libraries} from '../../stories/data'

import Settings from './index'

const StatefulSettings = compose(
  withState('selectedServerId', 'onSelectServer', servers[1].id),
  withState('selectedLibrarySectionId', 'onSelectLibrarySection', libraries[1].id),
)(Settings)

storiesOf('Settings', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <StatefulSettings
      servers={servers}
      librarySections={libraries}
      onLogOut={action('onLogOut')}
    />
  ))

