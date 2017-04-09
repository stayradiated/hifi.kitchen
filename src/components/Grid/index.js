import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {InfiniteLoader, List} from 'react-virtualized'
import classNames from 'classnames'
import getScrollbarWidth from 'get-scrollbar-width'

import './styles.css'

import Row from './Row'

const SCROLLBAR = getScrollbarWidth()

export default class Grid extends Component {
  static propTypes = {
    className: PropTypes.string,

    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    total: PropTypes.number,

    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    itemsPerRow: PropTypes.number.isRequired,
    getItemHeight: PropTypes.func,

    paddingHorizontal: PropTypes.number,

    children: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
  }

  static defaultProps = {
    itemsPerRow: 5,
    getItemHeight: (width) => width,
    paddingHorizontal: 0,
  }

  constructor () {
    super()
    this.handleLoadMoreRows = this.handleLoadMoreRows.bind(this)
  }

  calcRows () {
    const {itemsPerRow, items} = this.props

    return items.reduce((rows, item, index) => {
      if (index % itemsPerRow === 0) {
        rows.push([])
      }
      rows[rows.length - 1].push(item)
      return rows
    }, [])
  }

  calcTotal () {
    const {items, total} = this.props
    return total != null ? total : items.length
  }

  handleLoadMoreRows ({startIndex, stopIndex}) {
    const {onLoad, itemsPerRow} = this.props
    return onLoad(startIndex * itemsPerRow, (stopIndex + 1) * itemsPerRow)
  }

  render () {
    const {
      children,
      width, height, className,
      getItemHeight, itemsPerRow, paddingHorizontal,
    } = this.props

    const innerWidth = width - SCROLLBAR - (paddingHorizontal * 2)

    const itemWidth = Math.floor(innerWidth / itemsPerRow)
    const itemHeight = getItemHeight(itemWidth)
    const rowOffset = ((width - SCROLLBAR) % itemWidth) / 2

    const total = this.calcTotal()

    const rows = this.calcRows()
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
          items={row.filter((item) => item != null)}
          renderItem={children}
        />
      )
    }

    return (
      <div className={classNames(className, 'Grid')}>
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
              rowHeight={itemHeight}
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
