import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import SwitchServer from '../../components/SwitchServer'

import {
  fetchAccountServers,
  selectAccountServers,
} from '../../stores/servers/account'
import {
  selectAllDevices,
} from '../../stores/servers/devices'
import {
  selectAllConnections,
} from '../../stores/servers/connections'
import {
  fetchServerStatus,
  selectServerStatus,
} from '../../stores/servers/status'

class SwitchServerContainer extends Component {
  static propTypes = {
    accountServers: PropTypes.arrayOf(PropTypes.string).isRequired,
    allDevices: PropTypes.instanceOf(Map).isRequired,
    allConnections: PropTypes.instanceOf(Map).isRequired,
    allStatuses: PropTypes.instanceOf(Map).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  async componentWillMount () {
    const {dispatch} = this.props
    const getState = await dispatch(fetchAccountServers())
    const accountServers = selectAccountServers.value(getState())
    accountServers.forEach((serverId) =>
      dispatch(fetchServerStatus(serverId)))
  }

  render () {
    const {accountServers, allDevices, allConnections, allStatuses} = this.props
    const servers = accountServers.map((id) => allDevices.get(id))

    return (
      <SwitchServer
        servers={servers}
        connections={allConnections}
        statuses={allStatuses}
      />
    )
  }
}

export default connect((state) => ({
  accountServers: selectAccountServers.value(state),
  allDevices: selectAllDevices.values(state),
  allConnections: selectAllConnections.values(state),
  allStatuses: selectServerStatus.values(state),
}))(SwitchServerContainer)
