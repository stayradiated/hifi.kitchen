import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.css'

import Image from '../Image'

export default function SquareImage (props) {
  const { imageClassName, className, src, size, quality } = props

  return (
    <div className={classNames(className, 'SquareImage')}>
      <Image
        className={classNames(imageClassName, 'SquareImage-container')}
        width={size}
        height={size}
        src={src}
        quality={quality}
      />
    </div>
  )
}

SquareImage.propTypes = {
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  size: PropTypes.number,
  quality: PropTypes.number,
  src: PropTypes.string
}
