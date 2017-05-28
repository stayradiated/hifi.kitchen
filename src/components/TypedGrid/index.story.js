import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Wrapper from '../../stories/Wrapper'
import {albums, artists} from '../../stories/data'

import TypedGrid from './index'

storiesOf('TypedGrid', module)
  .addDecorator(Wrapper)
  .add('of Albums', () => (
    <TypedGrid
      items={albums}
      onChange={action('Select Item')}
    />
  ))
  .add('of Artists', () => (
    <TypedGrid
      items={artists}
      onChange={action('Select Item')}
    />
  ))

