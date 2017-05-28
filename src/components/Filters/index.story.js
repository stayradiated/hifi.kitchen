import React from 'react'
import {storiesOf} from '@storybook/react'

import Wrapper from '../../stories/Wrapper'

import Filters from './index'

storiesOf('Filters', module)
  .addDecorator(Wrapper)
  .add('Default', () => (
    <Filters />
  ))

