import React, {PropTypes} from 'react'
import {InfiniteLoader, List} from 'react-virtualized'
import withHandlers from 'recompose/withHandlers'

import './styles.css'

const handleLoad = (props) => ({startIndex, stopIndex}) => {
  const {onLoad} = props
  return onLoad(startIndex, stopIndex + 1)
}

function ItemsList (props) {
  const {items, renderItem, onLoad, ...otherProps} = props

  const isRowLoaded = ({index}) => items[index] != null

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={onLoad}
      rowCount={items.length}
    >
      {({onRowsRendered, registerChild}) => (
        <List
          {...otherProps}
          rowCount={items.length}
          rowRenderer={renderItem}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
        />
      )}
    </InfiniteLoader>
  )
}

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  renderItem: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
}

export default withHandlers({
  onLoad: handleLoad,
})(ItemsList)
