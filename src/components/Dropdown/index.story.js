import React from 'react'
import {storiesOf} from '@kadira/storybook'
import withState from 'recompose/withState'

import Wrapper from '../../stories/Wrapper'

import Dropdown from './index'

const StatefulDropdown = (
  withState('active', 'onChange', 'Year')
)(Dropdown)

storiesOf('Dropdown', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <StatefulDropdown
      items={[
        'Year',
        'Release Date',
        'Rating',
        'Date Added',
        'Date Played',
        'Views',
      ]}
      descending
    />
  ))

