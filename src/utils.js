export function remap (data) {
  if (!Array.isArray(data) && Object.keys(data).length === 0) {
    return new Map()
  }
  return new Map(data)
}

export function resolveKeys (object, keys) {
  return keys.reduce((o, k) => {
    if (o == null || !Object.prototype.hasOwnProperty.call(o, k)) {
      return null
    }
    return o[k]
  }, object)
}

export function rehydrateMapReducer (state, payload, keys) {
  const cache = resolveKeys(payload, keys)

  if (cache == null) {
    return state
  }

  return {
    ...state,
    errors: remap(cache.errors),
    fetched: remap(cache.fetched),
    promises: remap(cache.promises),
    values: remap(cache.values),
  }
}

export function rehydrateValueReducer (state, payload, keys) {
  const cache = resolveKeys(payload, keys)

  if (cache == null) {
    return state
  }

  return {
    ...state,
    ...cache,
  }
}
