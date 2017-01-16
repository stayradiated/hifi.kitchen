import {any} from 'bluebird'
import {ServerConnection} from 'perplexed'

import {createFetchMapStore} from '../../storeTemplates'

import {FETCH_SERVER_STATUS} from '../constants'
import {fetchAccountServers} from './account'
import {selectAllConnections} from './connections'
import {selectAllDevices} from './devices'

const TIMEOUT = 5 * 1000

async function connect (account, server, connection) {
  const serverConnection = new ServerConnection(connection.uri, account)
  try {
    await serverConnection.fetchJSON('/', {timeout: TIMEOUT})
  } catch (e) {
    return {
      available: false,
      server: server.id,
    }
  }
  return {
    available: true,
    server: server.id,
    connection: connection.uri,
    serverConnection,
  }
}

const fetchServerStatus = (serverId) => {
  return async (dispatch, getState) => {
    // make sure all the account servers have been fetched first
    await dispatch(fetchAccountServers())
    const state = getState()
    const allDevices = selectAllDevices.values(state)
    const allConnections = selectAllConnections.values(state)

    const server = allDevices.get(serverId)
    const connections = server.connections.map((id) => allConnections.get(id))

    return dispatch({
      types: FETCH_SERVER_STATUS,
      payload: {id: serverId},
      meta: {
        plex: ({account}) => any(
          connections.map((c) => connect(account, server, c))),
      },
    })
  }
}

module.exports = createFetchMapStore({
  name: 'ServerStatus',
  constant: FETCH_SERVER_STATUS,
  rootSelector: (state) => state.servers.status,
  forceFetch: fetchServerStatus,
  getCacheOptions: (serverId) => ({
    id: serverId,
  }),
})
