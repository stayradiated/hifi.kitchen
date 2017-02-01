import {createSelector} from 'reselect'

import {selectPlex} from '../plex'
import {selectAllTracks} from '../tracks/all'

export const root = (state) => state.queue

export const tracks = createSelector(
  root, selectAllTracks.values,
  (_root, allTracks) =>
  _root.items
    .filter((item) => allTracks.has(item.track))
    .map((item) => allTracks.get(item.track)),
)

export const selectedItemOffset = createSelector(
  root,
  (_root) => _root.selectedItemOffset,
)

export const queueItem = createSelector(
  root,
  (_root) => {
    const item = _root.items[_root.selectedItemOffset]
    if (item == null) {
      return null
    }
    return item
  },
)

export const track = createSelector(
  queueItem, selectAllTracks.values,
  (_item, allTracks) => {
    if (_item == null) {
      return null
    }
    return allTracks.get(_item.track)
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
