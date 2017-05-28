import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import withState from 'recompose/withState'

import Wrapper from '../../stories/Wrapper'

import NavBar from './index'

const StatefulNavBar = (
  withState('currentSection', 'onChangeSection', 'Albums'),
  withState('sortBy', 'onChangeSortBy', 'Date Added')
)(NavBar)

storiesOf('NavBar', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <StatefulNavBar
      sections={['Playlists', 'Artists', 'Albums', 'Tracks']}
      onChange={action('On Change')}
      sortOptions={[
        'Year',
        'Release Date',
        'Rating',
        'Date Added',
        'Date Played',
        'Views',
      ]}
    />
  ))

