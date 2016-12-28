import {createSelector} from 'reselect'

import {values as getAllTracks} from '../tracks/all/selectors'

export const root = (state) => state.queue

export const tracks = createSelector(
  root, getAllTracks,
  (_root, allTracks) =>
    _root.items.map((item) => allTracks.get(item.track)),
)

export const queueItem = createSelector(
  root, getAllTracks,
  (_root, allTracks) => {
    const item = _root.items[_root.selectedItemOffset]
    if (item == null) {
      return null
    }
    return {
      ...item,
      track: allTracks.get(item.track),
    }
  },
)

export const selectedItemOffset = createSelector(
  root,
  (_root) => _root.selectedItemOffset,
)
