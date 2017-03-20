import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import noop from 'nop'

import './styles.css'

import Icon from '../Icon'

export default class SearchBar extends Component {
  constructor () {
    super()

    this.state = {
      displayInput: false,
    }

    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    const {onClick} = this.props
    this.setState({displayInput: true})
    this.input.focus()
    return onClick(event)
  }

  handleBlur (event) {
    event.stopPropagation()
    this.setState({displayInput: false})
    return true
  }

  handleChange () {
    const {onChange} = this.props
    const query = this.input.value
    return onChange(query)
  }

  render () {
    const {className, query} = this.props
    const {displayInput} = this.state

    return (
      <button
        className={classNames(className, 'SearchBar')}
        onClick={this.handleClick}
      >
        <div className='SearchBar-contents'>
          <Icon className='SearchBar-icon' icon='search' />
          <div
            className={classNames('SearchBar-inputWrapper', {
              'SearchBar-inputWrapper_closed': !displayInput,
            })}
          >
            <input
              ref={(el) => { this.input = el }}
              className='SearchBar-input'
              placeholder='Search...'
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              value={query}
            />
          </div>
        </div>
      </button>
    )
  }
}

SearchBar.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
}

SearchBar.defaultProps = {
  onClick: noop,
  onChange: noop,
}
