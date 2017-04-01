import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {
  fetchServerStatus,
} from '../../stores/servers/status'
import {
  initializePlex,
  usePlexServer,
  setPlexReady,
  selectPlex,
} from '../../stores/plex/instance'
import {
  fetchLibrarySections,
} from '../../stores/library/sections/actions'

import Loading from '../../components/Loading'

class LoadingContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    serverId: PropTypes.string,
  }

  async componentWillMount () {
    const {serverId, dispatch} = this.props
    await dispatch(initializePlex())

    // if we were logged into a server ID, try getting that server status
    if (serverId != null) {
      await dispatch(fetchServerStatus(serverId))
      await dispatch(usePlexServer(serverId))
      await dispatch(fetchLibrarySections())
    }

    dispatch(setPlexReady())
  }

  render () {
    return (
      <Loading />
    )
  }
}

export default connect((state) => ({
  library: selectPlex.library(state),
  serverId: selectPlex.serverId(state),
}))(LoadingContainer)
