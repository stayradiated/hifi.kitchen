import {
  createObjectMergeFunction,
  createMapSelector,
} from '@stayradiated/mandarin'

export default function createPassiveMapStore (options) {
  const {
    constants, entity,
    rootSelector,
    mergeOptions = {},
  } = options

  const selectors = createMapSelector(rootSelector)

  const mergeItems = createObjectMergeFunction(mergeOptions)

  const initialState = {
    values: new Map(),
  }

  const reducer = (state = initialState, action) => {
    if (constants.includes(action.type)) {
      return {
        ...state,
        values: mergeItems(state.values, action.value.entities[entity]),
      }
    }
    return state
  }

  return {
    reducer,
    selectors,
  }
}
