import {
  createObjectMergeFunction,
  createMapSelector,
} from '@stayradiated/mandarin'

export default function createPassiveMapStore (options) {
  const {
    name, constants, entity,
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
    [`select${name}`]: selectors,
  }
}
