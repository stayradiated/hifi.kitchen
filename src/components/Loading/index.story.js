import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'

import Loading from './index'

storiesOf('Loading', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <Loading />
  ))
