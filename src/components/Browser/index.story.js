import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Wrapper from '../../stories/Wrapper'
import {albums} from '../../stories/data'

import Browser from './index'
import {ARTIST, ALBUM, PLAYLIST, TRACK, SEARCH} from '../../stores/constants'

storiesOf('Browser', module)
  .addDecorator(Wrapper)
  .add('Albums & Artists', () => (
    <Browser
      navBarSections={{
        [SEARCH]: 'Search',
        [ALBUM]: 'Albums',
        [ARTIST]: 'Artists',
        [PLAYLIST]: 'Playlists',
        [TRACK]: 'Tracks',
      }}
      sortBy='Up'
      sortDesc={false}
      sortOptions={['Up', 'Down', 'All Around']}
      section={ALBUM}
      sectionItems={albums}
      onChangeItem={action('onChangeItem')}
      onChangeSearchQuery={action('onChangeSearchQuery')}
      onChangeSection={action('onChangeSection')}
      onChangeSortBy={action('onChangeSortBy')}
      onCreateQueue={action('onCreateQueue')}
      onLoadItemChildren={action('onLoadItemChildren')}
      onLoadItems={action('onLoadItems')}
      onRateTrack={action('onRateTrack')}
    />
  ))

