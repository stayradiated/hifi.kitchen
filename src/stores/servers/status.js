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
    await serverConnection.fetch('/', {timeout: TIMEOUT})
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

export function connectMultiple (account, server, connections) {
  if (connections.length <= 0) {
    throw new Error('Must pass at least one connection')
  }

  return new Promise((resolve, reject) => {
    Promise.all(connections.map(async (c) => {
      const connection = await connect(account, server, c)
      if (connection.available) {
        resolve(connection)
      }
      return connection
    })).then((results) => {
      // none of the connections were successful
      resolve(results[0])
    }).catch(reject)
  })
}

const handleFetchServerStatus = (serverId) => {
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
        plex: ({account}) => connectMultiple(account, server, connections),
      },
    })
  }
}

const store = createFetchMapStore({
  constant: FETCH_SERVER_STATUS,
  rootSelector: (state) => state.servers.status,
  forceFetch: handleFetchServerStatus,
  getCacheOptions: (serverId) => ({
    id: serverId,
  }),
})

export const reducer = store.reducer
export const fetchServerStatus = store.fetchMap
export const forceFetchServerStatus = store.forceFetch
export const selectServerStatus = store.selectors
