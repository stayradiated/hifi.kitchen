import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FloatingLabel from
  '@stayradiated/react-floating-label'
// import '@stayradiated/react-floating-label/lib/styles.css'

import './styles.css'

export default class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    errorMessage: PropTypes.string
  }

  constructor () {
    super()

    this.state = {
      username: '',
      password: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleFormSubmit (event) {
    event.preventDefault()
    const { onSubmit } = this.props
    if (onSubmit) {
      onSubmit(this.state)
    }
  }

  handleUsernameChange (event) {
    const value = event.target.value
    this.setState({ username: value })
  }

  handlePasswordChange (event) {
    const value = event.target.value
    this.setState({ password: value })
  }

  render () {
    const { errorMessage } = this.props

    return (
      <div className='LoginForm'>
        <form
          className='LoginForm-form'
          onSubmit={this.handleFormSubmit}
        >
          <h1 className='LoginForm-logo'>
            HiFi Kitchen
          </h1>
          <FloatingLabel
            placeholder='Username'
            type='text'
            id='LoginForm-username'
            onChange={this.handleUsernameChange}
          />
          <FloatingLabel
            placeholder='Password'
            type='password'
            id='LoginForm-password'
            onChange={this.handlePasswordChange}
          />
          {errorMessage &&
            <p className='LoginForm-error'>{errorMessage}</p>}
          <button type='submit' className='LoginForm-button'>
            Log In
          </button>
        </form>
      </div>
    )
  }
}
