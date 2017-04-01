import {actionTypes} from 'redux-localstorage'
import {createSelector} from 'reselect'

import {PLEX_CHECK_PIN, PLEX_AUTHENTICATE} from '../constants'

const initialState = {
  authToken: null,
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return {
        ...state,
        ...((action.payload && action.payload.user) || {}),
      }

    case PLEX_AUTHENTICATE.SUCCESS:
      return {
        authToken: action.value.authToken,
      }

    case PLEX_CHECK_PIN.SUCCESS:
      if (action.value.authToken != null) {
        return {
          authToken: action.value.authToken,
        }
      }
      return state

    default:
      return state
  }
}

const rootSelector = (state) => state.user

export const selectUser = {
  loggedIn: createSelector(rootSelector, (root) => !!root.authToken),
  authToken: createSelector(rootSelector, (root) => root.authToken),
}
