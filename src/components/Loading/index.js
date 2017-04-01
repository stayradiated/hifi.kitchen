import React from 'react'
import Spinner from 'react-spinkit'

import './styles.css'

export default function () {
  return (
    <div className='Loading'>
      <Spinner spinnerName='pulse' className='Loading-spinner' />
    </div>
  )
}
