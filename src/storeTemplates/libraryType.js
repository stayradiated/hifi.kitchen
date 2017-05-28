import {normalize} from 'perplexed'
import {
  AsyncMapReducer,
  createObjectMergeFunction,
  cacheMap,
  createMapSelector,
} from '@stayradiated/mandarin'

export default function createLibraryTypeStore (options) {
  const {
    entity,
    libraryType,
    constant: TYPE,
    rootSelector, mergeActions = [], customActions = {},
    fetchItems = ({library}, id) =>
      normalize(library.metadata(id, libraryType)),
  } = options

  console.assert(typeof entity === 'string', 'entity missing')
  console.assert(typeof libraryType === 'number', 'libraryType missing')
  console.assert(Array.isArray(TYPE), 'constant missing')
  console.assert(typeof rootSelector === 'function', 'rootSelector missing')
  console.assert(Array.isArray(mergeActions), 'mergeActions missing')
  console.assert(typeof customActions === 'object', 'customActions missing')
  console.assert(typeof fetchItems === 'function', 'fetchItems missing')

  const selectors = createMapSelector(rootSelector)

  const forceFetchType = (id) => ({
    types: TYPE,
    payload: {id},
    meta: {
      plex: (plex) => fetchItems(plex, id),
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
      case TYPE.REQUEST:
        return asyncReducer.handleRequest(state, action)

      case TYPE.FAILURE:
        return asyncReducer.handleFailure(state, action)

      case TYPE.SUCCESS:
        return asyncReducer.handleSuccess(state, action)

      default:
        if (mergeActions.includes(action.type)) {
          const entityValues = action.value.entities[entity]

          return {
            ...state,
            values: mergeItems(state.values, entityValues),
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
    forceFetchType,
    fetchType,
    selectors,
  }
}
