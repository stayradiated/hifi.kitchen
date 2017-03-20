import {createSelector} from 'reselect'
import {Client, Account, Library} from 'perplexed'
import {actionTypes} from 'redux-localstorage'

import config from '../../../config.json'

import {
  PLEX_INITIALIZE,
  PLEX_USE_SERVER,
  PLEX_USE_LIBRARY_SECTION,
  PLEX_READY,
} from '../constants'

import {selectUser} from '../user'
import {selectServerStatus} from '../servers/status'

const initialState = {
  ready: false,
  client: null,
  account: null,
  serverConnection: null,
  library: null,
  serverId: null,
  libarySectionId: null,
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

export const setPlexReady = () => ({
  type: PLEX_READY,
})

export const usePlexServerConnection = (serverId, serverConnection) => {
  const library = new Library(serverConnection)

  return {
    type: PLEX_USE_SERVER,
    payload: {serverId, serverConnection, library},
  }
}

export const usePlexServer = (serverId) => {
  return (dispatch, getState) => {
    const state = getState()

    const allStatuses = selectServerStatus.values(state)
    const status = allStatuses.get(serverId)

    if (status != null && status.available) {
      return dispatch(usePlexServerConnection(serverId, status.serverConnection))
    }
  }
}

export const clearPlexServerConnection = () => {
  return {
    type: PLEX_USE_SERVER,
    payload: {serverConnection: null, library: null},
  }
}

export const usePlexLibrarySection = (librarySectionId) => {
  return {
    type: PLEX_USE_LIBRARY_SECTION,
    payload: {librarySectionId},
  }
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return {
        ...state,
        ...((
          action.payload &&
          action.payload.plex &&
          action.payload.plex.instance
        ) || {}),
      }

    case PLEX_INITIALIZE:
    case PLEX_USE_SERVER:
    case PLEX_USE_LIBRARY_SECTION:
      return {
        ...state,
        ...action.payload,
      }

    case PLEX_READY:
      return {
        ...state,
        ready: true,
      }

    default:
      return state
  }
}

const rootSelector = (state) => state.plex.instance

export const selectPlex = {
  root: rootSelector,
  ready: createSelector(rootSelector, (root) => root.ready),
  account: createSelector(rootSelector, (root) => root.account),
  client: createSelector(rootSelector, (root) => root.client),
  library: createSelector(rootSelector, (root) => root.library),
  serverConnection: createSelector(rootSelector, (root) => root.serverConnection),
  serverId: createSelector(rootSelector, (root) => root.serverId),
  librarySectionId: createSelector(rootSelector, (root) => root.librarySectionId),
}
