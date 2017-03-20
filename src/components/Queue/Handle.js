import React from 'react'
import {SortableHandle} from 'react-sortable-hoc'

import './Handle.css'

import Icon from '../Icon'

function Handle () {
  return (
    <Icon icon='menu' className='QueueHandle' />
  )
}


export default new SortableHandle(Handle)
