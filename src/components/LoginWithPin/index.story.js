import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'

import LoginWithPin from './index'

storiesOf('Login Form', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <LoginWithPin
      pin={{code: 'CODE'}}
    />
  ))

