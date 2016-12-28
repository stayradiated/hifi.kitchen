import {createSelector} from 'reselect'

import {values as getAllTracks} from '../tracks/all/selectors'

export const root = (state) => state.queue

export const tracks = createSelector(
  root, getAllTracks,
  (_root, allTracks) =>
    _root.items.map((item) => allTracks.get(item.track)),
)

export const track = createSelector(
  root, getAllTracks,
  (_root, allTracks) => {
    const queueItem = _root.items[_root.selectedItemOffset]
    if (queueItem == null) {
      return null
    }
    return allTracks.get(queueItem.track)
  },
)

export const selectedItemOffset = createSelector(
  root,
  (_root) => _root.selectedItemOffset,
)
