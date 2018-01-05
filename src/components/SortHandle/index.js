import React from 'react'
import { SortableHandle } from 'react-sortable-hoc'

import './styles.css'

import Icon from '../Icon'

function SortHandle () {
  return (
    <Icon icon='menu' className='SortHandle' />
  )
}

export default new SortableHandle(SortHandle)
