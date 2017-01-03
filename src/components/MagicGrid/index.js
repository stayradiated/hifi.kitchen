import React, {Component, PropTypes} from 'react'
import {InfiniteLoader, List} from 'react-virtualized'
import classNames from 'classnames'

import './styles.css'

import {IdType, ItemsType} from './types'
import Row from './Row'

export default class MagicGrid extends Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.element.isRequired,
    currentId: IdType,
    height: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
    items: ItemsType.isRequired,
    onLoad: PropTypes.func,
    propName: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
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
      this.list && this.list.recomputeRowHeights(0)
    }
  }

  calcItemsPerRow () {
    const {width, itemWidth} = this.props
    return Math.floor(width / itemWidth)
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
    return (width % itemWidth) / 2
  }

  handleLoadMoreRows ({startIndex, stopIndex}) {
    const {onLoad} = this.props
    const itemsPerRow = this.calcItemsPerRow()
    return onLoad(startIndex * itemsPerRow, (stopIndex * itemsPerRow) + 1)
  }

  render () {
    const {
      width, height,
      className, itemHeight, itemWidth,
      component, propName, currentId, total,
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

    const rowRenderer = (props) => {
      const {index, key, style} = props
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
          component={component}
          propName={propName}
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
