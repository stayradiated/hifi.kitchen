import React from 'react'
import PropTypes from 'prop-types'
import {filter} from 'perplexed'
import {compose, withState, withHandlers, setPropTypes} from 'recompose'

import SelectOption from './SelectOption'
import Input from './Input'

const handlePropertyChange = (props) => (event) => {
  const {setProperty, operator, setOperator} = props
  const {value} = event.target
  setProperty(value)

  const operatorOptions = filter[value].options()
  if (Object.hasOwnProperty.call(operatorOptions, operator) === false) {
    setOperator(Object.keys(operatorOptions)[0])
  }
}

const handleOperatorChange = (props) => (event) => {
  const {setOperator} = props
  const {value} = event.target
  setOperator(value)
}

const Filters = (props) => {
  const {
    property, operator, value,
    onPropertyChange, onOperatorChange, setValue,
  } = props

  const propertyOptions = filter.availableTrackOptions
  const operatorOptions = filter[property].options()

  return (
    <div>
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
        onChange={setValue}
      />

      {JSON.stringify(filter[property][operator](...value))}
    </div>
  )
}

Filters.propTypes = {
  property: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,

  onPropertyChange: PropTypes.func.isRequired,
  onOperatorChange: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default compose(
  withState('property', 'setProperty', 'artistTitle'),
  withState('operator', 'setOperator', 'is'),
  withState('value', 'setValue', []),
  setPropTypes({
    setProperty: PropTypes.func.isRequired,
    setOperator: PropTypes.func.isRequired,
  }),
  withHandlers({
    onPropertyChange: handlePropertyChange,
    onOperatorChange: handleOperatorChange,
  })
)(Filters)
