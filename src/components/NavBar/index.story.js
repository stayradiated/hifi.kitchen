import React from 'react'
import {storiesOf, action} from '@kadira/storybook'
import withState from 'recompose/withState'

import Wrapper from '../../stories/Wrapper'

import NavBar from './index'

const StatefulNavBar = (
  withState('currentSection', 'onChangeSection', 'Albums')
)(NavBar)

storiesOf('NavBar', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <StatefulNavBar
      sections={['Playlists', 'Artists', 'Albums', 'Tracks']}
      onChange={action('On Change')}
    />
  ))

