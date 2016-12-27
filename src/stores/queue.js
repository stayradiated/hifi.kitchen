import {createSelector} from 'reselect'

import {CREATE_QUEUE, SELECT_QUEUE_ITEM} from './actions'
import {selectors as getTracks} from './tracks'

const initialState = {
  id: null,
  // selectedItemId: null,
  selectedItemOffset: null,
  // selectedMetadataItemId: null,
  items: [],
  size: 0,
  totalCount: 0,
  totalSize: 0,
  shuffled: false,
  sourceURI: null,
}

const rootSelector = (state) => state.queue

export const selectors = {
  tracks: createSelector(
    rootSelector, getTracks.values,
    (root, allTracks) =>
      root.items.map((item) => allTracks.get(item.track)),
  ),
  track: createSelector(
    rootSelector, getTracks.values,
    (root, allTracks) => {
      const queueItem = root.items[root.selectedItemOffset]
      if (queueItem == null) {
        return null
      }
      return allTracks.get(queueItem.track)
    }),
  selectedItemOffset: createSelector(
    rootSelector,
    (root) => root.selectedItemOffset,
  ),
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_QUEUE.SUCCESS:
      return {
        ...state,
        ...action.value.result,
      }

    case SELECT_QUEUE_ITEM:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
