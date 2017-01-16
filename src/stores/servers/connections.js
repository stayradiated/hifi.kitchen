import {createPassiveMapStore} from '../../storeTemplates'

import {FETCH_ACCOUNT_SERVERS} from '../constants'

module.exports = createPassiveMapStore({
  name: 'AllConnections',
  entity: 'connections',
  constants: [FETCH_ACCOUNT_SERVERS.SUCCESS],
  rootSelector: (state) => state.servers.connections,
  mergeOptions: {
    getId: (conn) => conn.uri,
  },
})
