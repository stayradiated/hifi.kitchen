import {normalize} from 'perplexed'

import {createFetchValueStore} from '../../storeTemplates'

import {FETCH_ACCOUNT_SERVERS} from '../constants'

module.exports = createFetchValueStore({
  name: 'AccountServers',
  constant: FETCH_ACCOUNT_SERVERS,
  rootSelector: (state) => state.servers.account,
  getActionOptions: () => ({
    meta: {
      plex: ({account}) => normalize(account.servers()),
    },
  }),
  reducerOptions: {
    defaultValue: [],
    getValue: (action) => action.value.result.id.devices,
  },
})
