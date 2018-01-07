import React from 'react'
import PropTypes from 'prop-types'
import { SortableHandle } from 'react-sortable-hoc'
import classNames from 'classnames'

import './styles.css'

import Icon from '../Icon'

function SortHandle (props) {
  const { className } = props

  return (
    <Icon
      icon='menu'
      className={classNames('SortHandle', className)}
    />
  )
}

SortHandle.propTypes = {
  className: PropTypes.string
}

export default new SortableHandle(SortHandle)
