import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import LoginForm from '../../components/LoginForm'

import {authenticatePlex, selectPlexAuth} from '../../stores/plex/auth'
import {selectUser} from '../../stores/user'

class LoginRoute extends Component {
  static propTypes = {
    authError: PropTypes.instanceOf(Error),
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (fields) {
    const {dispatch} = this.props
    const {username, password} = fields
    dispatch(authenticatePlex(username, password))
  }

  render () {
    const {loggedIn, authError} = this.props

    if (loggedIn) {
      return (
        <Redirect to='/settings' />
      )
    }

    return (
      <LoginForm
        onSubmit={this.handleLogin}
        errorMessage={authError && authError.message}
      />
    )
  }
}

export default connect((state) => ({
  authError: selectPlexAuth.error(state),
  loggedIn: selectUser.loggedIn(state),
}))(LoginRoute)
