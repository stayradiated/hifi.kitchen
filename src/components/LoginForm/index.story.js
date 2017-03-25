import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'

import LoginForm from './index'

storiesOf('Login Form', module)
  .addDecorator(Wrapper)
  .add('Main', () => (
    <LoginForm
      onSubmit={action('Submit Form')}
      errorMessage='Authentication failed'
    />
  ))

