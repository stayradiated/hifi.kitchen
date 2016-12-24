import React, {PropTypes} from 'react'

export default function Arrow (props) {
  const {size, left} = props

  const marginLeft = left - size

  const styles = {
    width: 0,
    height: 0,
    borderLeft: `${size}px solid transparent`,
    borderRight: `${size}px solid transparent`,
    borderBottom: `${size}px solid red`,
    marginTop: -size,
    marginLeft,
    position: 'absolute',
    transition: 'all 350ms ease',
  }

  return (
    <div style={styles} />
  )
}

Arrow.propTypes = {
  left: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
}
