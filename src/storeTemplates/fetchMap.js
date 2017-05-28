import {
  cacheMap,
  AsyncMapReducer,
  createMapSelector,
} from '@stayradiated/mandarin'

export default function createFetchMapStore (options) {
  const {
    constant: TYPE,
    rootSelector,
    forceFetch,
    getCacheOptions = () => ({}),
    reducerOptions = {},
  } = options

  const selectors = createMapSelector(rootSelector)

  const fetchMap = cacheMap((...args) => ({
    dispatch: forceFetch,
    selectors,
    ...getCacheOptions(...args),
  }))

  const asyncReducer = new AsyncMapReducer(reducerOptions)

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
    fetchMap,
    forceFetch,
    selectors,
  }
}
