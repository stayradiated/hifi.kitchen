import React, {PropTypes} from 'react'
import pure from 'recompose/pure'

function GridListRowHeader (props) {
  const {style, rowOffset, section, renderFn} = props

  return (
    <div className='GridListRowHeader' style={style}>
      <div className='GridListRowHeader-content' style={{marginLeft: `${rowOffset}px`}}>
        {renderFn(section)}
      </div>
    </div>
  )
}

GridListRowHeader.propTypes = {
  section: PropTypes.shape({}).isRequired,
  rowOffset: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  renderFn: PropTypes.func.isRequired,
}

export default pure(GridListRowHeader)
