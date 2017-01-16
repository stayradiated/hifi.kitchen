import React, {PropTypes} from 'react'
import {AutoSizer} from 'react-virtualized'

import MagicGrid from '../MagicGrid'

export default function MuggleGrid (props) {
  const {
    className, items, currentId, onLoad, onChange, getId,
    children, component, propName, total,
  } = props

  const mappedItems = items.map((item) => {
    if (item == null) {
      return item
    }
    return {
      id: getId(item),
      element: children(item, onChange),
    }
  })

  return (
    <AutoSizer>
      {({height, width}) => (
        <MagicGrid
          className={className}
          component={component}
          currentId={currentId}
          height={height}
          itemHeight={212}
          itemWidth={150}
          items={mappedItems}
          onLoad={onLoad}
          propName={propName}
          total={total != null ? total : items.length}
          width={width}
        />
      )}
    </AutoSizer>
  )
}

MuggleGrid.propTypes = {
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  component: PropTypes.element.isRequired,
  currentId: PropTypes.number,
  getId: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  onLoad: PropTypes.func,
  propName: PropTypes.string.isRequired,
  total: PropTypes.number,
}

MuggleGrid.defaultProps = {
  getId: (item) => item.id,
}
