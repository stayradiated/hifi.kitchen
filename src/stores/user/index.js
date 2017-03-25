import {actionTypes} from 'redux-localstorage'
import {createSelector} from 'reselect'

import {PLEX_AUTHENTICATE} from '../constants'

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
      return action.value

    default:
      return state
  }
}

const rootSelector = (state) => state.user

export const selectUser = {
  loggedIn: createSelector(rootSelector, (root) => !!root.authToken),
  authToken: createSelector(rootSelector, (root) => root.authToken),
}
