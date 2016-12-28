import {AsyncValueReducer} from '@stayradiated/mandarin'

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
