import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Wrapper from '../../stories/Wrapper'

import LoginForm from './index'

storiesOf('Login Form', module)
  .addDecorator(Wrapper)
  .add('Default', () => (
    <LoginForm
      onSubmit={action('Submit Form')}
      errorMessage='Authentication failed'
    />
  ))

