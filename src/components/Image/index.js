import React, {PropTypes} from 'react'

export default function Image (props, context) {
  const {src, width, height, ...otherProps} = props
  const {library} = context

  const transcodeSrc = (src != null)
    ? library.resizePhoto({
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

Image.contextTypes = {
  library: PropTypes.shape({}).isRequired,
}
