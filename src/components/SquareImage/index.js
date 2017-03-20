import React, {PropTypes} from 'react'
import classNames from 'classnames'

import './styles.css'

import Image from '../Image'

export default function SquareImage (props) {
  const {imageClassName, className, src} = props

  return (
    <div className={classNames(className, 'SquareImage')}>
      <Image
        className={classNames(imageClassName, 'SquareImage-container')}
        src={src}
      />
    </div>
  )
}

SquareImage.propTypes = {
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  src: PropTypes.string,
}
