import {actionTypes} from 'redux-localstorage'
import {AsyncValueReducer} from '@stayradiated/mandarin'

import {rehydrateValueReducer} from '../../../utils'
import {FETCH_LIBRARY_ALBUMS} from '../../constants'

const reducer = new AsyncValueReducer({
  defaultValue: [],
  getValue: (action) => action.value.result.items,
  updateValue: (newValue, oldValue) => {
    return oldValue.concat(newValue)
  },
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return rehydrateValueReducer(state, action.payload, ['library', 'albums'])

    case FETCH_LIBRARY_ALBUMS.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_LIBRARY_ALBUMS.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_LIBRARY_ALBUMS.SUCCESS:
      return reducer.handleSuccess(state, action)

    default:
      return state
  }
}
