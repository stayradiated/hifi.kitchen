import React, {Component, PropTypes} from 'react'
import {InfiniteLoader, List} from 'react-virtualized'
import classNames from 'classnames'

import './styles.css'

import {IdType, ItemsType} from './types'
import Row from './Row'

const SCROLLBAR = 15

export default class MagicGrid extends Component {
  static propTypes = {
    className: PropTypes.string,

    items: ItemsType.isRequired,
    currentId: IdType,
    total: PropTypes.number.isRequired,

    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,

    renderSelection: PropTypes.func,
    onLoad: PropTypes.func,
  }

  constructor () {
    super()

    this.state = {
      previousId: null,
    }

    this.handleLoadMoreRows = this.handleLoadMoreRows.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentId !== this.props.currentId) {
      this.setState({
        previousId: this.props.currentId,
      })
      if (this.list != null) {
        this.list.recomputeRowHeights(0)
      }
    }
  }

  calcItemsPerRow () {
    const {width, itemWidth} = this.props
    return Math.floor((width - SCROLLBAR) / itemWidth)
  }

  calcRows (itemsPerRow) {
    const {items} = this.props

    if (itemsPerRow === 0) {
      return []
    }

    return items.reduce((rows, item, index) => {
      if (index % itemsPerRow === 0) {
        rows.push([])
      }
      rows[rows.length - 1].push(item)
      return rows
    }, [])
  }

  calcRowOffset () {
    const {width, itemWidth} = this.props
    return ((width - SCROLLBAR) % itemWidth) / 2
  }

  handleLoadMoreRows ({startIndex, stopIndex}) {
    const {onLoad} = this.props
    const itemsPerRow = this.calcItemsPerRow()
    return onLoad(startIndex * itemsPerRow, (stopIndex + 1) * itemsPerRow)
  }

  render () {
    const {
      width, height,
      className, itemHeight, itemWidth,
      renderSelection, currentId, total,
    } = this.props
    const {previousId} = this.state

    const itemsPerRow = this.calcItemsPerRow()
    const rowOffset = this.calcRowOffset()
    const rows = this.calcRows(itemsPerRow)
    const rowCount = Math.ceil(total / itemsPerRow)

    const isRowLoaded = ({index}) => {
      const row = rows[index]
      if (row == null) {
        return false
      }
      return row.every((item) => item != null)
    }

    const rowRenderer = ({index, key, style}) => {
      const row = rows[index]

      if (row == null) {
        return <div key={key} style={style} />
      }

      return (
        <Row
          key={key}
          style={style}
          rowOffset={rowOffset}
          itemWidth={itemWidth}
          row={row.filter((item) => item != null)}
          renderSelection={renderSelection}
          currentId={currentId}
          previousId={previousId}
        />
      )
    }

    const calcRowHeight = ({index}) => {
      const row = rows[index]
      if (row && row.some((item) => item && item.id === currentId)) {
        return itemHeight * 3
      }
      return itemHeight
    }

    return (
      <div className={classNames(className, 'MagicGrid')}>
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={this.handleLoadMoreRows}
          rowCount={rowCount}
        >
          {({onRowsRendered, registerChild}) => (
            <List
              width={width}
              height={height}
              onRowsRendered={onRowsRendered}
              ref={(el) => {
                this.list = el
                registerChild(el)
              }}
              rowCount={rowCount}
              rowHeight={calcRowHeight}
              rowRenderer={rowRenderer}
              style={{
                overflowX: 'hidden',
              }}
            />
          )}
        </InfiniteLoader>
      </div>
    )
  }
}
