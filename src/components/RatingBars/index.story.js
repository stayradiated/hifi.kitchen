import React from 'react'
import {storiesOf} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'

import RatingBars from './index'

storiesOf('RatingBars', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <RatingBars
      style={{width: '1000px', height: '100px'}}
      value={7}
      maxValue={10}
    />
  ))
