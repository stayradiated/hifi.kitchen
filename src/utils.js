export function remap (data) {
  if (!Array.isArray(data) && Object.keys(data).length === 0) {
    return new Map()
  }
  return new Map(data)
}

export function rehydateMapReducer (cache) {
  return {
    errors: remap(cache.errors),
    fetched: remap(cache.fetched),
    promises: remap(cache.promises),
    values: remap(cache.values),
  }
}

export function rehydrateValueReducer (state, cache) {
  return {
    ...state,
    ...cache,
  }
}
