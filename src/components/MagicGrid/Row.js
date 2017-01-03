import React, {PropTypes} from 'react'
import pure from 'recompose/pure'

import Arrow from './Arrow'
import Box from './Box'
import {IdType, ItemsType} from './types'

function MagicGridRow (props) {
  const {
    itemWidth, row, currentId, previousId, component,
    propName, style, rowOffset,
  } = props

  const rowCurrentIndex = row.findIndex((release) => release.id === currentId)
  const hasCurrent = rowCurrentIndex > -1
  const hadCurrent = row.some((release) => release.id === previousId)

  const sameRow = hasCurrent && hadCurrent
  const arrowMarginLeft = (
    rowOffset + ((itemWidth * (rowCurrentIndex + 1)) - (itemWidth / 2)))

  return (
    <div className='MagicGrid-row' style={style}>
      <div className='MagicGrid-rowItems' style={{marginLeft: `${rowOffset}px`}}>
        {row.map((items, i) => (
          <div
            key={i}
            className='MagicGrid-item'
            style={{
              width: `${itemWidth}px`,
              minWidth: `${itemWidth}px`,
            }}
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
  rowOffset: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  row: ItemsType.isRequired,
  currentId: IdType,
  previousId: IdType,
  component: PropTypes.element.isRequired,
  propName: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
}

export default pure(MagicGridRow)
