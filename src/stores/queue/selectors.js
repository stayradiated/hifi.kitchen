import {createSelector} from 'reselect'

import {values as getAllTracks} from '../tracks/all/selectors'

export const root = (state) => state.queue

export const tracks = createSelector(
  root, getAllTracks,
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
  queueItem, getAllTracks,
  (_item, allTracks) => {
    if (_item == null) {
      return null
    }
    return allTracks.get(_item.track)
  },
)
