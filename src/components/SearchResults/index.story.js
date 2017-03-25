import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'
import {search} from '../../stories/data'

import SearchResults from './index'

storiesOf('SearchResults', module)
  .addDecorator(Wrapper)
  .add('default', () => (
    <SearchResults
      query='Young'
      hubs={search}
      onChange={action('onChange')}
    />
  ))

