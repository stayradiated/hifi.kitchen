import {createPassiveMapStore} from '../../storeTemplates'

import {FETCH_ACCOUNT_SERVERS} from '../constants'

const store = createPassiveMapStore({
  entity: 'connections',
  constants: [FETCH_ACCOUNT_SERVERS.SUCCESS],
  rootSelector: (state) => state.servers.connections,
  mergeOptions: {
    getId: (conn) => conn.uri,
  },
})

export const reducer = store.reducer
export const selectAllConnections = store.selectors
