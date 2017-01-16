import {createPassiveMapStore} from '../../storeTemplates'

import {FETCH_ACCOUNT_SERVERS} from '../constants'

module.exports = createPassiveMapStore({
  name: 'AllDevices',
  entity: 'devices',
  constants: [FETCH_ACCOUNT_SERVERS.SUCCESS],
  rootSelector: (state) => state.servers.devices,
  mergeOptions: {
    getId: (device) => device.id,
  },
})
