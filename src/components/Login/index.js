import React, {Component, PropTypes} from 'react'

import './styles.css'

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func,
  }

  constructor () {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const {onLogin} = this.props
    const username = this.username.value
    const password = this.password.value
    onLogin(username, password)
  }

  render () {
    return (
      <div className='Login'>
        <form className='Login-form' onSubmit={this.handleSubmit}>
          <label
            className='Login-label'
            htmlFor='Login-username'
          >
            Username:
          </label>
          <input
            id='Login-username'
            type='text'
            ref={(el) => { this.username = el }}
          />
          <label
            className='Login-label'
            htmlFor='Login-password'
          >
            Password:
          </label>
          <input
            id='Login-password'
            type='password'
            ref={(el) => { this.password = el }}
          />
          <button>Login</button>
        </form>
      </div>
    )
  }
}
