import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Modal = (props) => {
  const {children} = props

  return (
    <div className='Modal'>
      <div className='Modal-overlay' />
      <div className='Modal-window'>
        <div className='Modal-content'>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Modal
