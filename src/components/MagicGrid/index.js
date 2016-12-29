import React, {Component, PropTypes} from 'react'

import './styles.css'

import {IdType, ItemsType} from './types'
import Row from './Row'

export default class MagicGrid extends Component {
  static propTypes = {
    itemWidth: PropTypes.number.isRequired,
    items: ItemsType.isRequired,
    component: PropTypes.element.isRequired,
    propName: PropTypes.string.isRequired,
    currentId: IdType,
  }

  constructor () {
    super()

    this.state = {
      containerWidth: 0,
      previousId: null,
    }

    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentId !== this.props.currentId) {
      this.setState({
        previousId: this.props.currentId,
      })
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize () {
    this.setState({
      containerWidth: this.container.offsetWidth,
    })
  }

  calcAlbumsPerRow () {
    const {itemWidth} = this.props
    const {containerWidth} = this.state
    return Math.floor(containerWidth / itemWidth)
  }

  calcRows () {
    const {items} = this.props
    const albumsPerRow = this.calcAlbumsPerRow()

    return items.reduce((rows, item, index) => {
      if (index % albumsPerRow === 0) {
        rows.push([])
      }
      rows[rows.length - 1].push(item)
      return rows
    }, [[]])
  }

  calcRowOffset () {
    const {itemWidth} = this.props
    const {containerWidth} = this.state
    return (containerWidth % itemWidth) / 2
  }

  render () {
    const {itemWidth, component, propName, currentId} = this.props
    const {previousId} = this.state

    const rowOffset = this.calcRowOffset()

    return (
      <div
        className='MagicGrid'
        ref={(el) => { this.container = el }}
      >
        {this.calcRows().map((row, i) => (
          <Row
            key={i}
            index={i}
            rowOffset={rowOffset}
            itemWidth={itemWidth}
            row={row}
            component={component}
            propName={propName}
            currentId={currentId}
            previousId={previousId}
          />
        ))}
      </div>
    )
  }
}
