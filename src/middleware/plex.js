export default function plexMiddleware (store) {
  return (next) => (action) => {
    if (!action.meta || !('plex' in action.meta)) {
      return next(action)
    }

    const plex = store.getState().plex
    action.meta.async = action.meta.plex(plex)

    return next(action)
  }
}
