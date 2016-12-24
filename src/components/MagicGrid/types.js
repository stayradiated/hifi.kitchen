import {PropTypes} from 'react'

export const IdType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
])

export const ItemsType = PropTypes.arrayOf(PropTypes.shape({
  id: IdType.isRequired,
  element: PropTypes.node.isRequired,
}))
