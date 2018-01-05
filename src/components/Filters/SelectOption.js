import React from 'react'
import PropTypes from 'prop-types'

const SelectOption = (props) => {
  const { value, onChange, options } = props

  return (
    <select value={value} onChange={onChange}>
      {Object.keys(options).map((key) => (
        <option key={key} value={key}>{options[key]}</option>
      ))}
    </select>
  )
}

SelectOption.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired
}

export default SelectOption
