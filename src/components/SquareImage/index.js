import React, {PropTypes} from 'react'
import classNames from 'classnames'

import './styles.css'

export default function SquareImage (props) {
  const {className, src} = props

  return (
    <div className={classNames(className, 'SquareImage')}>
      <div className='SquareImage-container'>
        <div
          className='SquareImage-image'
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
      </div>
    </div>
  )
}

SquareImage.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}
