import {createSelector} from 'reselect'

import {selectPlex} from '../plex/instance'
import {selectAllTracks} from '../tracks/all'

export const root = (state) => state.queue

export const queueId = createSelector(root, (_root) => _root.id)
export const items = createSelector(root, (_root) => _root.items)
export const selectedItemId = createSelector(root, (_root) => _root.selectedItemId)
export const shuffled = createSelector(root, (_root) => _root.shuffled)

export const queueItem = createSelector(
  root,
  (_root) => {
    const item = _root.items.find((qI) => qI.id === _root.selectedItemId)
    if (item == null) {
      return null
    }
    return item
  },
)

export const trackId = createSelector(
  queueItem,
  (_item) => {
    if (_item == null) {
      return null
    }
    return _item.track
  }
)

export const track = createSelector(
  trackId, selectAllTracks.values,
  (_trackId, allTracks) => {
    return allTracks.get(_trackId) || null
  },
)

export const trackSrc = createSelector(
  track, selectPlex.library,
  (_track, library) => {
    if (library != null && _track != null) {
      return library.trackSrc(_track)
    }
    return null
  },
)

