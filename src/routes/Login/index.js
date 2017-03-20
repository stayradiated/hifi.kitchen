import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import LoginForm from '../../components/LoginForm'

import {authenticatePlex, selectPlexAuth} from '../../stores/plex/auth'

class LoginRoute extends Component {
  static propTypes = {
    authError: PropTypes.instanceOf(Error),
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
    const {authError} = this.props

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
}))(LoginRoute)
