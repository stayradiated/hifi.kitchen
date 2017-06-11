import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Modal = (props) => {
  const {children, onClose} = props

  return (
    <div className='Modal'>
      <button className='Modal-overlay' onClick={onClose} />
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
  onClose: PropTypes.func.isRequired,
}

export default Modal
