import React, {Component, cloneElement, PropTypes} from 'react'

import {IdType} from './types'

export default class MagicGridBox extends Component {
  static propTypes = {
    id: IdType.isRequired,
    component: PropTypes.element.isRequired,
    propName: PropTypes.string.isRequired,
    old: PropTypes.bool,
  }

  constructor (props) {
    super()

    const {old} = props

    this.state = {
      height: old ? 'auto' : '0px',
      animate: false,
    }
  }

  componentDidMount () {
    this.animate()
  }

  componentWillReceiveProps () {
    this.setState({animate: true})
  }

  componentDidUpdate () {
    if (this.state.animate) {
      this.animate()
      this.setState({animate: false})
    }
  }

  animate () {
    const height = `${this.container.offsetHeight}px`
    this.setState({height}, () => {
      if (this.props.old) {
        setImmediate(() => this.setState({height: '0px'}))
      }
    })
  }

  render () {
    const {component, propName, id} = this.props
    const {height} = this.state

    const styles = {
      height,
      transition: 'all 500ms ease',
      overflow: 'hidden',
      marginBottom: '10px',
    }

    return (
      <div style={styles}>
        <div ref={(el) => { this.container = el }}>
          {cloneElement(component,  {[propName]: id})}
        </div>
      </div>
    )
  }
}
