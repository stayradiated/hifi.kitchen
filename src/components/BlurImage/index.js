import React from 'react'

import PropTypes from 'prop-types'

// styles
import './styles.css'

import Image from '../Image'

export default function BlurImage (props) {
  const { src } = props

  return (
    <div className='BlurImage'>
      <div className='BlurImage-blur'>
        <Image
          className='BlurImage-image'
          src={src}
        />
      </div>
      <div className='BlurImage-shadow' />
    </div>
  )
}

BlurImage.propTypes = {
  src: PropTypes.string
}
