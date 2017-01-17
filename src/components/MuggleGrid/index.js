import React, {PropTypes} from 'react'
import {AutoSizer} from 'react-virtualized'

import MagicGrid from '../MagicGrid'

export default function MuggleGrid (props) {
  const {
    className, items, currentId, onLoad, onChange, getId,
    children, total,
  } = props

  const [renderItem, renderSelection] = children

  const mappedItems = items.map((item) => {
    if (item == null) {
      return item
    }
    return {
      id: getId(item),
      element: renderItem(item, onChange),
    }
  })

  return (
    <AutoSizer>
      {({height, width}) => (
        <MagicGrid
          className={className}

          items={mappedItems}
          currentId={currentId}
          total={total != null ? total : items.length}

          height={height}
          width={width}
          itemHeight={212}
          itemWidth={150}

          renderSelection={renderSelection}
          onLoad={onLoad}
        />
      )}
    </AutoSizer>
  )
}

MuggleGrid.propTypes = {
  children: PropTypes.arrayOf(PropTypes.func).isRequired,
  className: PropTypes.string,
  currentId: PropTypes.number,
  getId: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
  total: PropTypes.number,
}

MuggleGrid.defaultProps = {
  getId: (item) => item.id,
}
