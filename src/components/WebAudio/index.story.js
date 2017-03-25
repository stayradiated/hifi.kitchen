import React from 'react'
import {storiesOf, action} from '@kadira/storybook'

import Wrapper from '../../stories/Wrapper'
import {tracks} from '../../stories/data'

import WebAudio from './index'
import Controls from '../Controls'

storiesOf('WebAudio', module)
  .addDecorator(Wrapper)
  .add('Web Audio', () => {
    const track = tracks[49]

    return (
      <WebAudio
        source={track.mediaPath}
        duration={track.duration / 1000}
      >
        {({currentTime, buffered, duration, paused, onPause, onPlay}) => (
          <Controls
            track={track}
            audio={{
              currentTime,
              buffered,
              duration,
            }}
            paused={paused}
            onPause={onPause}
            onPlay={onPlay}
            onPrev={action('Prev')}
            onNext={action('Next')}
            onQueue={action('Queue')}
          />
        )}
      </WebAudio>
    )
  })

