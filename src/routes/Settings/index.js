import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'

import Settings from '../../components/Settings'

import {
  fetchServerStatus,
  selectServerStatus,
  selectAllDevices,
  selectAllConnections,
  fetchAccountServers,
  selectAccountServers,
  usePlexServer,
  setLibrarySectionId,
  selectPlex,
  selectLibrarySectionId,
  fetchLibrarySections,
  selectLibrarySections
} from '@stayradiated/hifi-redux'

async function componentWillMount () {
  const { dispatch } = this.props
  const getState = await dispatch(fetchAccountServers())
  const accountServers = selectAccountServers.value(getState())
  accountServers.forEach((id) => dispatch(fetchServerStatus(id)))
}

async function componentWillReceiveProps (nextProps) {
  const { serverId, dispatch } = nextProps
  const { serverId: prevServerId } = this.props
  if (serverId !== prevServerId) {
    dispatch(fetchLibrarySections())
  }
}

const handleSelectServerId = (props) => (serverId) => {
  const { dispatch } = props
  dispatch(usePlexServer(serverId))
}

const handleSelectLibrarySectionId = (props) => (librarySectionId) => {
  const { dispatch } = props
  dispatch(setLibrarySectionId(librarySectionId))
}

const handleLogOut = () => () => {
  delete window.localStorage.plex
  window.location.reload()
}

export function SettingsRoute (props) {
  const {
    accountServers, allDevices, allConnections, allStatuses,
    librarySections, librarySectionId, serverId,
    onSelectServer, onSelectLibrarySection, onLogOut
  } = props

  const servers = accountServers.map((id) => {
    const status = allStatuses.get(id)
    const connection = status && allConnections.get(status.connection)
    return {
      ...allDevices.get(id),
      status,
      connection
    }
  })

  return (
    <Settings
      servers={servers}
      selectedServerId={serverId}
      onSelectServer={onSelectServer}
      librarySections={librarySections}
      selectedLibrarySectionId={librarySectionId}
      onSelectLibrarySection={onSelectLibrarySection}
      onLogOut={onLogOut}
    />
  )
}

SettingsRoute.propTypes = {
  accountServers: PropTypes.arrayOf(PropTypes.string).isRequired,
  allDevices: PropTypes.instanceOf(Map).isRequired,
  allConnections: PropTypes.instanceOf(Map).isRequired,
  allStatuses: PropTypes.instanceOf(Map).isRequired,
  librarySections: PropTypes.arrayOf(PropTypes.object),
  serverId: PropTypes.string,
  librarySectionId: PropTypes.number,
  onSelectServer: PropTypes.func.isRequired,
  onSelectLibrarySection: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired
}

export default compose(
  connect((state) => ({
    accountServers: selectAccountServers.value(state),
    allDevices: selectAllDevices.values(state),
    allConnections: selectAllConnections.values(state),
    allStatuses: selectServerStatus.values(state),
    librarySections: selectLibrarySections.value(state),
    serverId: selectPlex.serverId(state),
    librarySectionId: selectLibrarySectionId(state)
  })),
  lifecycle({
    componentWillMount,
    componentWillReceiveProps
  }),
  withHandlers({
    onSelectServer: handleSelectServerId,
    onSelectLibrarySection: handleSelectLibrarySectionId,
    onLogOut: handleLogOut
  })
)(SettingsRoute)
