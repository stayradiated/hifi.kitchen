import React, {Component, PropTypes} from 'react'
import {InfiniteLoader, List} from 'react-virtualized'
import classNames from 'classnames'
import getScrollbarWidth from 'get-scrollbar-width'

import './styles.css'

import Row from './Row'
import RowHeader from './RowHeader'

const SCROLLBAR = getScrollbarWidth()

export default class GridList extends Component {
  static propTypes = {
    className: PropTypes.string,

    sections: PropTypes.arrayOf(PropTypes.shape({
      header: PropTypes.any,
      items: PropTypes.arrayOf(PropTypes.any),
      total: PropTypes.number,
    })).isRequired,

    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    itemsPerRow: PropTypes.number.isRequired,
    getItemHeight: PropTypes.func,

    paddingHorizontal: PropTypes.number,

    renderItem: PropTypes.func.isRequired,
    renderHeader: PropTypes.func.isRequired,
    onLoad: PropTypes.func,
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

  componentDidUpdate (prevProps) {
    if (prevProps.width !== this.props.width) {
      this.list.recomputeRowHeights()
    }
  }

  calcRows () {
    const {
      sections, getItemHeight, itemsPerRow,
      width, paddingHorizontal,
      renderItem, renderHeader,
    } = this.props

    const innerWidth = width - SCROLLBAR - (paddingHorizontal * 2)
    const itemWidth = Math.floor(innerWidth / itemsPerRow)
    const itemHeight = getItemHeight(itemWidth)
    const rowOffset = ((width - SCROLLBAR) % itemWidth) / 2

    const mapItemToRow = (items) => ({
      Component: Row,
      props: {
        renderFn: renderItem,
        items,
        itemWidth,
        rowOffset,
      },
      height: itemHeight,
      isLoaded: items.every((item) => item != null),
    })

    const sortItemsIntoGroups = (items) => items.reduce((rows, item, index) => {
      if (index % itemsPerRow === 0) {
        rows.push([])
      }
      rows[rows.length - 1].push(item)
      return rows
    }, [])

    const breakIntoRows = (items) =>
      sortItemsIntoGroups(items).map(mapItemToRow)

    return sections.reduce((allSections, section) => {
      const items = breakIntoRows(section.items)

      return [
        ...allSections,
        {
          Component: RowHeader,
          props: {
            renderFn: renderHeader,
            section,
            rowOffset,
          },
          height: 50,
          isLoaded: true,
        },
        ...items,
      ]
    }, [])
  }

  calcRowCount () {
    const {sections, itemsPerRow} = this.props
    return sections.reduce((sum, section) => {
      const itemsCount = (section.total != null
        ? section.total
        : section.items.length)
      return sum + Math.ceil(itemsCount / itemsPerRow) + 1
    }, 0)
  }

  handleLoadMoreRows ({startIndex, stopIndex}) {
    const {onLoad, itemsPerRow} = this.props
    return onLoad(startIndex * itemsPerRow, (stopIndex + 1) * itemsPerRow)
  }

  render () {
    const {
      width, height, className,
    } = this.props

    const rows = this.calcRows()
    const rowCount = this.calcRowCount()

    const isRowLoaded = ({index}) => {
      const row = rows[index]
      return row != null && row.isLoaded
    }

    const rowRenderer = ({index, key, style}) => {
      const row = rows[index]

      return (
        <row.Component
          {...row.props}
          key={key}
          style={style}
        />
      )
    }

    const rowHeight = ({index}) => {
      const row = rows[index]
      return row.height
    }

    return (
      <div className={classNames(className, 'GridList')}>
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
              rowHeight={rowHeight}
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
