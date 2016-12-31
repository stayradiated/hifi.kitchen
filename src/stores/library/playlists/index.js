import {actionTypes} from 'redux-localstorage'
import {AsyncValueReducer} from '@stayradiated/mandarin'

import {rehydrateValueReducer} from '../../../utils'
import {FETCH_LIBRARY_PLAYLISTS} from '../../constants'

const reducer = new AsyncValueReducer({
  defaultValue: [],
  getValue: (action) => action.value.result,
  updateValue: (newValue, oldValue) => {
    return oldValue.concat(newValue)
  },
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return rehydrateValueReducer(state, action.payload, ['library', 'playlists'])

    case FETCH_LIBRARY_PLAYLISTS.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_LIBRARY_PLAYLISTS.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_LIBRARY_PLAYLISTS.SUCCESS:
      return reducer.handleSuccess(state, action)

    default:
      return state
  }
}
