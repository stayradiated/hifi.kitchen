import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'
import noop from 'nop'

import './styles.css'

import Icon from '../Icon'
import DropdownItem from './Item'

const handleOpen = (props) => () => {
  const {setOpen} = props
  setOpen(true)
}

const handleClose = (props) => () => {
  const {setOpen} = props
  setOpen(false)
}

const handleToggle = (props) => () => {
  const {open, setOpen} = props
  setOpen(!open)
}

const handleChange = (props) => (item) => {
  const {onChange, setOpen} = props
  onChange(item)
  setOpen(false)
}

function Dropdown (props) {
  const {active, items, open, descending, onToggle, onChange} = props

  const menuClasses = classNames('Dropdown-menu', {
    'Dropdown-menu-open': open,
  })

  return (
    <div className='Dropdown'>
      <button className='Dropdown-button' onClick={onToggle}>
        <span className='Dropdown-button-text'>{active}</span>
        <Icon icon='down-dir' className='Dropdown=button-icon' />
      </button>
      <ul className={menuClasses}>
        {items.map((item) => (
          <DropdownItem
            key={item}
            item={item}
            active={active === item}
            descending={descending}
            onClick={onChange}
          />
        ))}
      </ul>
    </div>
  )
}

Dropdown.propTypes = {
  active: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool,
  descending: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default compose(
  defaultProps({
    onChange: noop,
  }),
  withState('open', 'setOpen', false),
  withHandlers({
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
    onChange: handleChange,
  })
)(Dropdown)
