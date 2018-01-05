import React from 'react'
import PropTypes from 'prop-types'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import withContext from 'recompose/withContext'

import Wrapper from '../../stories/Wrapper'
import { tracks } from '../../stories/data'

import WebAudio from './index'
import Controls from '../Controls'

const WebAudioWithContext = withContext({
  library: PropTypes.object
}, () => ({
  library: {
    resizePhoto: (src) => src
  }
}))(WebAudio)

storiesOf('WebAudio', module)
  .addDecorator(Wrapper)
  .add('Web Audio', () => {
    const track = tracks[49]

    return (
      <WebAudioWithContext
        source={'https://122-57-168-188.5d65810fd05e4d9abddb0f60758e3559.plex.direct:45804/library/parts/65977/1490522610/file.mp3?X-Plex-Session-Identifier=clzcyg9w7obht2xdcz2949ru&X-Plex-Product=Plex%20Web&X-Plex-Version=3.1.1&X-Plex-Client-Identifier=6ffb72b0-c203-4b20-9770-86a1eb46ca6f&X-Plex-Platform=Chrome&X-Plex-Platform-Version=54.0&X-Plex-Device=Linux&X-Plex-Device-Name=Plex%20Web%20%28Chrome%29&X-Plex-Device-Screen-Resolution=1322x623%2C1366x768&X-Plex-Token=HNNtkVW8rxag9JDRrfGW&Accept-Language=en-GB'}
      >
        {(audio) => (
          <Controls
            track={track}
            audio={audio}
            paused={false}
            onPause={action('onPause')}
            onPlay={action('onPlay')}
            onPrev={action('onPrev')}
            onNext={action('onNext')}
            onRateTrack={action('onRateTrack')}
          />
        )}
      </WebAudioWithContext>
    )
  })
