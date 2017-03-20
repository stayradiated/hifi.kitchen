import {
  createValueSelector,
  AsyncValueReducer,
} from '@stayradiated/mandarin'

import {
  PLEX_AUTHENTICATE,
} from '../constants'

export const authenticatePlex = (username, password) => ({
  types: PLEX_AUTHENTICATE,
  payload: {username, password},
  meta: {
    plex: ({account}) =>
      account.authenticate(username, password).catch(() => {
        throw new Error('Error authenticating with Plex')
      }),
  },
})

const asyncReducer = new AsyncValueReducer({
  defaultValue: {},
})

const reducer = (state = asyncReducer.initialState, action) => {
  switch (action.type) {
    case PLEX_AUTHENTICATE.REQUEST:
      return asyncReducer.handleRequest(state, action)

    case PLEX_AUTHENTICATE.FAILURE:
      return asyncReducer.handleFailure(state, action)

    case PLEX_AUTHENTICATE.SUCCESS:
      return asyncReducer.handleSuccess(state, action)

    default:
      return state
  }
}

const rootSelector = (root) => root.plex.auth

export const selectPlexAuth = createValueSelector(rootSelector)

export default reducer
