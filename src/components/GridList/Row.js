import React, {PropTypes} from 'react'
import pure from 'recompose/pure'

function GridRow (props) {
  const {itemWidth, items, style, rowOffset, renderFn} = props

  return (
    <div className='Grid-row' style={style}>
      <div className='Grid-rowItems' style={{marginLeft: `${rowOffset}px`}}>
        {items.map((item, key) => (
          <div
            key={key}
            className='Grid-item'
            style={{
              width: `${itemWidth}px`,
              minWidth: `${itemWidth}px`,
            }}
          >
            {renderFn(item)}
          </div>
        ))}
      </div>
    </div>
  )
}

GridRow.propTypes = {
  itemWidth: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  renderFn: PropTypes.func.isRequired,
  rowOffset: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
}

export default pure(GridRow)
