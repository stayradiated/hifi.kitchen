import React, {cloneElement, PropTypes} from 'react'

import {IdType} from './types'

export default function MagicGridBox (props) {
  const {component, propName, id} = props

  return (
    <div>
      {cloneElement(component,  {[propName]: id})}
    </div>
  )
}

MagicGridBox.propTypes = {
  id: IdType.isRequired,
  component: PropTypes.element.isRequired,
  propName: PropTypes.string.isRequired,
}
