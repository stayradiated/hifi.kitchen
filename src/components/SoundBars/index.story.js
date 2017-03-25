import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'

import SoundBars from './index'

storiesOf('SoundBars', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <SoundBars />
  ))
