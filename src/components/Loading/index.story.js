import React from 'react'
import { storiesOf } from '@storybook/react'

import Wrapper from '../../stories/Wrapper'

import Loading from './index'

storiesOf('Loading', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <Loading />
  ))
