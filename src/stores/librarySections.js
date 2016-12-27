import {AsyncValueReducer, createValueSelector} from '@stayradiated/mandarin'

import {FETCH_LIBRARY_SECTIONS} from './actions'

export const selectors = createValueSelector((state) => state.librarySections)

const reducer = new AsyncValueReducer({
  defaultValue: [],
  getValue: (action) => action.value.items,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case FETCH_LIBRARY_SECTIONS.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_LIBRARY_SECTIONS.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_LIBRARY_SECTIONS.SUCCESS:
      return reducer.handleSuccess(state, action)

    default:
      return state
  }
}
