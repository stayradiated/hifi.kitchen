import React, {PropTypes, cloneElement} from 'react'
import {List} from 'react-virtualized'

import './styles.css'

export default function ItemsList (props) {
  const {items, ...otherProps} = props

  const renderItem = ({index, style}) => {
    const item = items[index]
    return cloneElement(item, {
      key: index,
      style,
    })
  }

  return (
    <List
      {...otherProps}
      rowCount={items.length}
      rowRenderer={renderItem}
    />
  )
}

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
}
