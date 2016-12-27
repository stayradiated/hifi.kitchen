import React, {PropTypes} from 'react'

export default function Arrow (props) {
  const {size, left} = props

  const marginLeft = left - size

  const styles = {
    borderLeft: `${size}px solid transparent`,
    borderRight: `${size}px solid transparent`,
    borderBottom: `${size}px solid #333`,
    marginTop: -size,
    marginLeft,
  }

  return (
    <div className='MagicGrid-arrow' style={styles} />
  )
}

Arrow.propTypes = {
  left: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
}
