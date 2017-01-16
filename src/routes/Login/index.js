import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Login from '../../components/Login'

import {authenticatePlex} from '../../stores/plex'

class LoginRoute extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (username, password) {
    const {dispatch} = this.props
    dispatch(authenticatePlex(username, password))
  }

  render () {
    return (
      <Login onLogin={this.handleLogin} />
    )
  }
}

export default connect(() => ({
}))(LoginRoute)
