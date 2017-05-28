import {
  cacheValue,
  AsyncValueReducer,
  createValueSelector,
} from '@stayradiated/mandarin'

export default function createFetchValueStore (options) {
  const {
    constant: TYPE,
    rootSelector,
    getActionOptions = () => ({}),
    reducerOptions = {},
  } = options

  const selectors = createValueSelector(rootSelector)

  const forceFetchValue = (...args) => ({
    types: TYPE,
    ...getActionOptions(...args),
  })

  const fetchValue = cacheValue(() => ({
    dispatch: forceFetchValue,
    selectors,
  }))

  const asyncReducer = new AsyncValueReducer(reducerOptions)

  const reducer = (state = asyncReducer.initialState, action) => {
    switch (action.type) {
      case TYPE.REQUEST:
        return asyncReducer.handleRequest(state, action)

      case TYPE.FAILURE:
        return asyncReducer.handleFailure(state, action)

      case TYPE.SUCCESS:
        return asyncReducer.handleSuccess(state, action)

      default:
        return state
    }
  }

  return {
    reducer,
    fetchValue,
    forceFetchValue,
    selectors,
  }
}
