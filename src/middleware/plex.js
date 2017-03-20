import {selectPlex} from '../stores/plex/instance'

export default function plexMiddleware (store) {
  return (next) => (action) => {
    if (!action || !action.meta || !('plex' in action.meta)) {
      return next(action)
    }

    const plex = selectPlex.root(store.getState())
    action.meta.async = action.meta.plex(plex)

    return next(action)
  }
}
