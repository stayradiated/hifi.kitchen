import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import Wrapper from '../../stories/Wrapper'

import SoundBars from './index'

storiesOf('SoundBars', module)
  .addDecorator(Wrapper)
  .addDecorator(withKnobs)
  .add('default', () => (
    <SoundBars paused={boolean('Paused', false)} />
  ))
