import {normalize} from 'perplexed'

import {createFetchValueStore} from '../../storeTemplates'

import {FETCH_ACCOUNT_SERVERS} from '../constants'

const store = createFetchValueStore({
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

export const reducer = store.reducer
export const fetchAccountServers = store.fetchValue
export const forceFetchAccountServers = store.forceFetchValue
export const selectAccountServers = store.selectors
