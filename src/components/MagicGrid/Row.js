import React, {PropTypes} from 'react'

import Arrow from './Arrow'
import Box from './Box'
import {IdType, ItemsType} from './types'

export default function MagicGridRow (props) {
  const {
    itemWidth, row, index, currentId, previousId, component, propName,
  } = props

  const rowCurrentIndex = row.findIndex((release) => release.id === currentId)
  const hasCurrent = rowCurrentIndex > -1
  const hadCurrent = row.some((release) => release.id === previousId)

  const sameRow = hasCurrent && hadCurrent
  const arrowMarginLeft = (itemWidth * (rowCurrentIndex + 1)) - (itemWidth / 2)

  return (
    <div key={index} className='MagicGrid-row'>
      <div className='MagicGrid-rowItems'>
        {row.map((items, i) => (
          <div
            key={i}
            className='MagicGrid-item'
            style={{width: `${itemWidth}px`}}
          >
            {items.element}
          </div>
        ))}
      </div>
      {hasCurrent &&
        <Arrow
          id={currentId}
          left={arrowMarginLeft}
          size={10}
        />}
      {hasCurrent &&
        <Box id={currentId} component={component} propName={propName} />}
      {hadCurrent && !sameRow &&
        <Box id={previousId} component={component} propName={propName} old />}
    </div>
  )
}

MagicGridRow.propTypes = {
  itemWidth: PropTypes.number.isRequired,
  row: ItemsType.isRequired,
  index: PropTypes.number.isRequired,
  currentId: IdType,
  previousId: IdType,
  component: PropTypes.element.isRequired,
  propName: PropTypes.string.isRequired,
}

