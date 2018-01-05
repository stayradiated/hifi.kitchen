import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import Icon from '../Icon'

import './Item.css'

const handleClick = (props) => () => {
  const { onClick, item } = props
  onClick(item)
}

function DropdownItem (props) {
  const { item, active, descending, onClick } = props

  const classes = classNames('DropdownItem', {
    'DropdownItem-active': active
  })

  return (
    <li className={classes}>
      <button className='DropdownItem-button' onClick={onClick}>
        {item}
        {active && <Icon icon={descending ? 'down-open' : 'up-open'} />}
      </button>
    </li>
  )
}

DropdownItem.propTypes = {
  item: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default compose(
  withHandlers({
    onClick: handleClick
  })
)(DropdownItem)
