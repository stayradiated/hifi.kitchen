import {normalize} from 'perplexed'
import {
  c,
  AsyncMapReducer,
  createObjectMergeFunction,
  cacheMap,
  createMapSelector,
} from '@stayradiated/mandarin'

export default function createLibraryTypeStore (options) {
  const {
    type: TYPE, name, entity,
    rootSelector, mergeActions = [], customActions = {},
  } = options

  const FETCH_TYPE = c(`FETCH_${name.toUpperCase()}`)

  const selectors = createMapSelector(rootSelector)

  const forceFetchType = (id) => ({
    types: FETCH_TYPE,
    payload: {id},
    meta: {
      plex: ({library}) => normalize(library.metadata(id, TYPE)),
    },
  })

  const containsRequiredAttributes = (map, requiredAttributes = []) =>
    requiredAttributes.every((attribute) =>
      map.has(attribute) && map.get(attribute) != null)

  const fetchType = cacheMap((id, required) => ({
    id,
    selectors,
    dispatch: forceFetchType,
    validate: (item) => containsRequiredAttributes(item, required),
  }))

  const asyncReducer = new AsyncMapReducer({
    getId: (action) => action.payload.id,
    getValue: (action) => {
      const {id} = action.payload
      const {entities} = action.value
      return entities[entity][id]
    },
  })

  const mergeItems = createObjectMergeFunction({
    getId: (item) => item.id,
  })

  const reducer = (state = asyncReducer.initialState, action) => {
    switch (action.type) {
      case FETCH_TYPE.REQUEST:
        return asyncReducer.handleRequest(state, action)

      case FETCH_TYPE.FAILURE:
        return asyncReducer.handleFailure(state, action)

      case FETCH_TYPE.SUCCESS:
        return asyncReducer.handleSuccess(state, action)

      default:
        if (mergeActions.includes(action.type)) {
          return {
            ...state,
            values: mergeItems(state.values, action.value.entities[entity]),
          }
        }
        for (const key of Object.keys(customActions)) {
          if (key === action.type) {
            return customActions[key](state, action)
          }
        }
        return state
    }
  }

  return {
    reducer,
    [`FETCH_${name.toUpperCase()}`]: FETCH_TYPE,
    [`forceFetch${name}`]: forceFetchType,
    [`fetch${name}`]: fetchType,
    [`selectAll${name}s`]: selectors,
  }
}
