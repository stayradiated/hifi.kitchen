import React, {PropTypes} from 'react'
import classNames from 'classnames'

import './styles.css'

import Image from '../Image'

export default function SquareImage (props) {
  const {className, src, size} = props

  return (
    <div className={classNames(className, 'SquareImage')}>
      <div className='SquareImage-container'>
        <Image
          className='SquareImage-image'
          src={src}
          width={size}
          height={size}
        />
      </div>
    </div>
  )
}

SquareImage.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
}
