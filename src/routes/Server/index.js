import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import './styles.css'

import ServerMenu from '../../containers/ServerMenu'

import {
  selectPlexServerConnection,
  clearPlexServerConnection,
  selectPlex,
} from '../../stores/plex'
import {
  fetchServerStatus,
  selectServerStatus,
} from '../../stores/servers/status'

class ServerRoute extends Component {
  static propTypes = {
    params: PropTypes.shape({
      serverId: PropTypes.string,
    }).isRequired,
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    library: PropTypes.shape({}),
  }

  static childContextTypes = {
    library: PropTypes.shape({}),
  }

  constructor () {
    super()

    this.state = {
      loaded: false,
    }
  }

  getChildContext () {
    const {library} = this.props
    return {library}
  }

  componentWillMount () {
    const {serverId} = this.props.params
    this.updatePlexServer(serverId)
  }

  componentWillReceiveProps (nextProps) {
    const {serverId} = nextProps.params
    if (this.props.params.serverId !== serverId) {
      this.updatePlexServer(serverId)
    }
  }

  async updatePlexServer (serverId) {
    const {dispatch} = this.props
    const getState = await dispatch(fetchServerStatus(serverId))
    const status = selectServerStatus.values(getState()).get(serverId)
    if (status.available) {
      dispatch(selectPlexServerConnection(status.serverConnection))
      this.setState({loaded: true})
    } else {
      dispatch(clearPlexServerConnection())
      this.setState({loaded: false})
    }
  }

  render () {
    const {children} = this.props
    const {loaded} = this.state

    if (!loaded) {
      return (
        <div>...loading</div>
      )
    }

    return (
      <div className='ServerRoute'>
        <ServerMenu />
        {children}
      </div>
    )
  }
}

export default connect((state) => ({
  library: selectPlex.library(state),
}))(ServerRoute)
