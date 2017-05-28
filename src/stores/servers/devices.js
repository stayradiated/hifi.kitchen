import {createPassiveMapStore} from '../../storeTemplates'

import {FETCH_ACCOUNT_SERVERS} from '../constants'

const store = createPassiveMapStore({
  entity: 'devices',
  constants: [FETCH_ACCOUNT_SERVERS.SUCCESS],
  rootSelector: (state) => state.servers.devices,
  mergeOptions: {
    getId: (device) => device.id,
  },
})

export const reducer = store.reducer
export const selectAllDevices = store.selectors
