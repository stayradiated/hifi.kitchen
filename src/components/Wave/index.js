import React, {PropTypes} from 'react'
import {Layer, Rect, Stage, Group} from 'react-konva'
import classNames from 'classnames'

import './styles.css'

import withAutoSizer from '../hoc/withAutoSizer'

const BAR_WIDTH = 3
const BAR_GAP = 1
const SHADOW = 0.3

function Wave (props) {
  const {className, height: maxHeight, width, peaks, currentProgress} = props

  const height = Math.min(maxHeight, 200)

  const normal = 1 / peaks.reduce((max, peak) => (peak > max ? peak : max), 0)
  const total = peaks.length

  return (
    <Stage
      className={classNames(className, 'Wave')}
      width={width}
      height={height}
    >
      <Layer>
        {peaks.map((peak, index) => {
          const peakHeight = Math.floor(peak * normal * height * 0.7)
          const played = index / total <= currentProgress
          const fill = played ? '#FFA400' : '#FFFFFF'
          const x = index * (BAR_WIDTH + BAR_GAP)

          return (
            <Group key={index}>
              <Rect
                x={x}
                y={height * (1 - SHADOW)}
                width={BAR_WIDTH}
                height={peakHeight * -1 * (1 - SHADOW)}
                fill={fill}
              />
              <Rect
                x={x}
                y={height * (1 - SHADOW)}
                width={BAR_WIDTH}
                height={peakHeight * SHADOW}
                fill={fill}
                opacity={0.5}
              />
            </Group>
          )
        })}
      </Layer>
    </Stage>
  )
}

/*
{peaks.map((peak, index) => {
  const height = peak * 100 * normal
  const played = index / total <= currentProgress
  return (
    <div
      key={index}
      className={classNames('Wave-bar', {
        'Wave-barPlayed': played,
      })}
    >
      <div
        className='Wave-peak'
        style={{
          height: `${height * 0.7}%`,
          // transitionDelay: `${index * 100}ms`,
        }}
      />
      <div
        className='Wave-shadow'
        style={{
          height: `${height * 0.3}%`,
          // transitionDelay: `${index * 100}ms`,
        }}
      />
    </div>
  )
})}
*/

Wave.propTypes = {
  className: PropTypes.string,
  peaks: PropTypes.arrayOf(PropTypes.number),
  currentProgress: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default withAutoSizer(Wave)
