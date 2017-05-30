import React from 'react'
import {storiesOf} from '@storybook/react'

import Wrapper from '../../stories/Wrapper'

import LoginWithPin from './index'

storiesOf('Login Form With Pin', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <LoginWithPin
      pin={{code: 'CODE'}}
    />
  ))

