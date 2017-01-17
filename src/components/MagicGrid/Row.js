import React, {PropTypes} from 'react'
import pure from 'recompose/pure'

import Arrow from './Arrow'
import Box from './Box'
import {IdType, ItemsType} from './types'

function MagicGridRow (props) {
  const {
    itemWidth, row, currentId, previousId,
    style, rowOffset, renderSelection,
  } = props

  const rowCurrentIndex = row.findIndex((item) => item.id === currentId)
  const hasCurrent = rowCurrentIndex > -1
  const hadCurrent = row.some((item) => item.id === previousId)

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
        <Box>{renderSelection(currentId)}</Box>}
      {hadCurrent && !sameRow &&
        <Box old>{renderSelection(previousId)}</Box>}
    </div>
  )
}

MagicGridRow.propTypes = {
  rowOffset: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  row: ItemsType.isRequired,
  currentId: IdType,
  previousId: IdType,
  style: PropTypes.shape({}),
  renderSelection: PropTypes.func,
}

export default pure(MagicGridRow)
