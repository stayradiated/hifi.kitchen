import React, {PropTypes} from 'react'

import plex from '../../plex'

export default function Image (props) {
  const {src, width, height, ...otherProps} = props

  const transcodeSrc = plex.transcode({
    url: src,
    width,
    height,
    minSize: 1,
  })

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
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}
