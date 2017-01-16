import {createSelector} from 'reselect'
import {Client, Account, Library} from 'perplexed'

import config from '../../../config.json'

import {
  PLEX_INITIALIZE,
  PLEX_AUTHENTICATE,
  PLEX_USE_SERVER,
} from '../constants'

import {selectUser} from '../user'

const initialState = {
  client: null,
  account: null,
  serverConnection: null,
  library: null,
}

export const initializePlex = () => (dispatch, getState) => {
  const state = getState()
  const authToken = selectUser.authToken(state)

  const client = new Client(config.options)
  const account = new Account(client, authToken)

  return dispatch({
    type: PLEX_INITIALIZE,
    payload: {client, account},
  })
}

export const selectPlexServerConnection = (serverConnection) => {
  const library = new Library(serverConnection)

  return {
    type: PLEX_USE_SERVER,
    payload: {serverConnection, library},
  }
}

export const clearPlexServerConnection = () => {
  return {
    type: PLEX_USE_SERVER,
    payload: {serverConnection: null, library: null},
  }
}

export const authenticatePlex = (username, password) => ({
  types: PLEX_AUTHENTICATE,
  payload: {username, password},
  meta: {
    plex: ({account}) => {
      return account.authenticate(username, password)
    },
  },
})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case PLEX_INITIALIZE:
      return {
        ...state,
        ...action.payload,
      }

    case PLEX_USE_SERVER:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

const rootSelector = (state) => state.plex

export const selectPlex = {
  account: createSelector(rootSelector, (root) => root.account),
  client: createSelector(rootSelector, (root) => root.client),
  library: createSelector(rootSelector, (root) => root.library),
  serverConnection: createSelector(rootSelector, (root) => root.serverConnection),
}
