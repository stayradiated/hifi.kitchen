import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import LoginWithPin from '../../components/LoginWithPin'

import {selectUser} from '../../stores/user'
import {fetchPin, checkPin, selectPin} from '../../stores/plex/pin'

class LoginRoute extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    pin: PropTypes.shape({}),
  }

  componentWillMount () {
    const {dispatch} = this.props
    dispatch(fetchPin())

    this.interval = setInterval(() => {
      this.handleCheckPin()
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  handleCheckPin () {
    const {dispatch, pin} = this.props
    if (pin != null && pin.id != null) {
      dispatch(checkPin(pin.id))
    }
  }

  render () {
    const {pin, loggedIn/* , authError */} = this.props

    if (loggedIn) {
      return (
        <Redirect to='/settings' />
      )
    }

    return (
      <LoginWithPin pin={pin} />
    )
  }
}

export default connect((state) => ({
  loggedIn: selectUser.loggedIn(state),
  pin: selectPin.value(state),
}))(LoginRoute)
