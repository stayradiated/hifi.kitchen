import React, {PropTypes} from 'react'

import plex from '../../plex'

export default function Image (props) {
  const {src, width, height, ...otherProps} = props

  const transcodeSrc = src
    ? plex.resizePhoto({
      url: src,
      width,
      height,
      minSize: 1,
    })
    : ''

  return (
    <div
      {...otherProps}
      style={{
        backgroundImage: `url(${transcodeSrc})`,
      }}
    />
  )
}

Image.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}
