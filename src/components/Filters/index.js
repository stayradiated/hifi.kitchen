import React from 'react'
import PropTypes from 'prop-types'
import { filter } from 'perplexed'
import { compose, withState, withHandlers, setPropTypes } from 'recompose'

import SelectOption from './SelectOption'
import Input from './Input'

import './styles.css'

const handleSave = (props) => () => {
  const { onChange, property, operator, value } = props
  onChange(filter[property][operator](...value))
}

const handlePropertyChange = (props) => (event) => {
  const { setProperty, setOperator, operator } = props
  const { value: property } = event.target
  setProperty(property)

  const operatorOptions = filter[property].options()
  if (Object.hasOwnProperty.call(operatorOptions, operator) === false) {
    const defaultOperator = Object.keys(operatorOptions)[0]
    setOperator(defaultOperator)
  }
}

const handleOperatorChange = (props) => (event) => {
  const { setOperator } = props
  const { value: operator } = event.target
  setOperator(operator)
}

const handleValueChange = (props) => (value) => {
  const { setValue } = props
  setValue(value)
}

const Filters = (props) => {
  const {
    property, operator, value,
    onPropertyChange, onOperatorChange, onValueChange,
    onSave
  } = props

  const propertyOptions = filter.availableTrackOptions
  const operatorOptions = filter[property].options()

  return (
    <div className='Filters'>
      <SelectOption
        value={property}
        onChange={onPropertyChange}
        options={propertyOptions}
      />

      <SelectOption
        value={operator}
        onChange={onOperatorChange}
        options={operatorOptions}
      />

      <Input
        operator={operator}
        value={value}
        onChange={onValueChange}
      />

      <p>{JSON.stringify(filter[property][operator](...value))}</p>

      <button onClick={onSave}>Save</button>
    </div>
  )
}

Filters.propTypes = {
  property: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,

  onPropertyChange: PropTypes.func.isRequired,
  onOperatorChange: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,

  onChange: PropTypes.func.isRequired
}

export default compose(
  withState('property', 'setProperty', 'artistTitle'),
  withState('operator', 'setOperator', 'is'),
  withState('value', 'setValue', [ '', '' ]),
  setPropTypes({
    setProperty: PropTypes.func.isRequired,
    setOperator: PropTypes.func.isRequired
  }),
  withHandlers({
    onPropertyChange: handlePropertyChange,
    onOperatorChange: handleOperatorChange,
    onValueChange: handleValueChange,
    onSave: handleSave
  })
)(Filters)
