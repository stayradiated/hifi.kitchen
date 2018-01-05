import React from 'react'
import { Pulse } from 'better-react-spinkit'

import './styles.css'

export default function () {
  return (
    <div className='Loading'>
      <Pulse size={60} color='var(--primary)' />
    </div>
  )
}
