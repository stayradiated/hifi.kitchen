import {PropTypes} from 'react'

export default function Typed (props) {
  const {item, components} = props

  const type = item._type

  if (Object.hasOwnProperty.call(components, type) === false) {
    throw new Error(`Type "${type}" is not supported`)
  }

  return components[type](item)
}

Typed.propTypes = {
  item: PropTypes.shape({
    _type: PropTypes.string,
  }).isRequired,
  components: PropTypes.objectOf(PropTypes.func).isRequired,
}
