import React, {PropTypes} from 'react'

import './styles.css'

export default function Root (props) {
  const {children} = props

  return (
    <div className='Root'>
      <div className='Root-contents'>
        {children}
      </div>
    </div>
  )
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
}
