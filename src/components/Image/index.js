import React, {PropTypes} from 'react'
import getContext from 'recompose/getContext'

function Image (props) {
  const {width, height, library, src, ...otherProps} = props

  if (src == null) {
    return (
      <div {...otherProps} />
    )
  }

  const url = library.resizePhoto({
    url: src,
    width,
    height,
  })
  const backgroundImage = `url(${url})`

  return (
    <div
      {...otherProps}
      style={{backgroundImage}}
    />
  )
}

Image.defaultProps = {
  width: 500,
  height: 500,
}

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  library: PropTypes.shape({
    resizePhoto: PropTypes.func.isRequired,
  }).isRequired,
}

export default getContext({
  library: PropTypes.shape({}),
})(Image)
