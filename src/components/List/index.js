import React, {PropTypes} from 'react'
import {InfiniteLoader, List} from 'react-virtualized'
import withHandlers from 'recompose/withHandlers'

import './styles.css'

const handleLoad = (props) => ({startIndex, stopIndex}) => {
  const {onLoad} = props
  return onLoad(startIndex, stopIndex + 1)
}

function ItemsList (props) {
  const {rowCount, renderItem, isRowLoaded, onLoad, ...otherProps} = props

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={onLoad}
      rowCount={rowCount}
    >
      {({onRowsRendered, registerChild}) => (
        <List
          {...otherProps}
          rowCount={rowCount}
          rowRenderer={renderItem}
          onRowsRendered={onRowsRendered}
          ref={registerChild}
        />
      )}
    </InfiniteLoader>
  )
}

ItemsList.propTypes = {
  rowCount: PropTypes.number.isRequired,
  renderItem: PropTypes.func.isRequired,
  isRowLoaded: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
}

export default withHandlers({
  onLoad: handleLoad,
})(ItemsList)
