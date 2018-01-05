import React from 'react'
import PropTypes from 'prop-types'
import getContext from 'recompose/getContext'

function Image (props) {
  const { width, height, library, src, quality, ...otherProps } = props

  if (src == null) {
    return (
      <div {...otherProps} />
    )
  }

  const url = library.resizePhoto({
    url: src,
    width,
    height,
    quality
  })
  const backgroundImage = `url(${url})`

  return (
    <div
      {...otherProps}
      style={{ backgroundImage }}
    />
  )
}

Image.defaultProps = {
  width: 400,
  height: 400,
  quality: 90,
  library: {
    resizePhoto: ({ url }) => url
  }
}

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  quality: PropTypes.number,
  library: PropTypes.shape({
    resizePhoto: PropTypes.func.isRequired
  }).isRequired
}

export default getContext({
  library: PropTypes.shape({})
})(Image)
