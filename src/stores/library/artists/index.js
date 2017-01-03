import {AsyncListReducer} from '@stayradiated/mandarin'

import {FETCH_LIBRARY_ARTISTS} from '../../constants'

const reducer = new AsyncListReducer({
  getValues: (action) => action.value.result.items,
  getTotal: (action) => action.value.result.totalSize,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case FETCH_LIBRARY_ARTISTS.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_LIBRARY_ARTISTS.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_LIBRARY_ARTISTS.SUCCESS:
      return reducer.handleSuccess(state, action)

    default:
      return state
  }
}
