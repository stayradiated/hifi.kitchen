import React from 'react'

import PropTypes from 'prop-types'

import './styles.css'

export default function Root (props) {
  const { children } = props

  return (
    <div className='Root'>
      <div className='Root-contents'>
        {children}
      </div>
    </div>
  )
}

Root.propTypes = {
  children: PropTypes.node.isRequired
}
