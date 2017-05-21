import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {filter} from 'perplexed'

import './Input.css'

import SelectOption from './SelectOption'

const InputText = (props) => {
  const {value, onChange} = props

  return (
    <input
      type='text'
      className='Input-input'
      value={value[0]}
      onChange={(event) => onChange([event.target.value])}
    />
  )
}

InputText.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

const InputNumber = (props) => {
  const {value, onChange} = props

  return (
    <input
      type='number'
      className='Input-input'
      value={value[0]}
      onChange={(event) => onChange([parseInt(event.target.value, 10)])}
    />
  )
}

InputNumber.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

const InputAbsoluteDate = (props) => {
  const {value, onChange} = props

  return (
    <input
      type='date'
      className='Input-input'
      value={moment.unix(value[0]).format('YYYY-MM-DD')}
      onChange={(event) => onChange([moment(event.target.value).unix()])}
    />
  )
}

InputAbsoluteDate.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

const InputRelativeDate = (props) => {
  const {value, onChange} = props

  return (
    <div>
      <input
        type='number'
        className='Input-input'
        value={value[0]}
        onChange={(event) => onChange([
          parseInt(event.target.value, 10),
          value[1],
        ])}
      />
      <SelectOption
        value={value[1]}
        onChange={(event) => onChange([
          value[0],
          event.target.value,
        ])}
        options={filter.availableDateUnits}
      />
    </div>
  )
}

InputRelativeDate.propTypes = {
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

const Input = (props) => {
  const {operator, value, onChange} = props

  const options = {value, onChange}

  switch (operator) {
    case 'isBefore':
    case 'isAfter':
      return <InputAbsoluteDate {...options} />
    case 'inTheLast':
    case 'inNotTheLast':
      return <InputRelativeDate {...options} />
    case 'isGreaterThan':
    case 'isLessThan':
      return <InputNumber {...options} />
    case 'is':
    case 'isNot':
    case 'contains':
    case 'doesNotContain':
    case 'beginsWith':
    case 'endsWith':
    default:
      return <InputText {...options} />
  }
}

Input.propTypes = {
  operator: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Input
