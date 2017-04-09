import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router'

import {selectPlex} from '../../stores/plex/instance'
import {selectUser} from '../../stores/user'

import Root from '../../components/Root'
import Loading from '../../containers/Loading'
import Login from '../Login'
import Settings from '../Settings'
import Library from '../Library'

class AppRoute extends Component {
  static propTypes = {
    library: PropTypes.shape({}),
    ready: PropTypes.bool,
    loggedIn: PropTypes.bool,
    librarySectionId: PropTypes.number,
    match: PropTypes.shape({
      isExact: PropTypes.bool,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }

  static childContextTypes = {
    library: PropTypes.shape({}),
  }

  getChildContext () {
    const {library} = this.props
    return {library}
  }

  render () {
    const {ready, match, location, loggedIn, librarySectionId} = this.props

    // Display loading screen while we load the app
    if (!ready) {
      return (
        <Root>
          <Loading />
        </Root>
      )
    }

    // Redirect if user is not logged in
    if (location.pathname !== '/login' && !loggedIn) {
      return (
        <Redirect to='/login' />
      )
    }

    // Redirect if user has not selected a server
    if (location.pathname !== '/settings' && librarySectionId == null && loggedIn) {
      return (
        <Redirect to='/settings' />
      )
    }

    // Redirect if user is on '/'
    if (match.isExact) {
      return (
        <Redirect to='/library' />
      )
    }


    return (
      <Root>
        <Route path='/login' component={Login} />
        <Route path='/settings' component={Settings} />
        <Route path='/library' component={Library} />
      </Root>
    )
  }
}

export default connect((state) => ({
  library: selectPlex.library(state),
  ready: selectPlex.ready(state),
  loggedIn: selectUser.loggedIn(state),
  librarySectionId: selectPlex.librarySectionId(state),
}))(AppRoute)
