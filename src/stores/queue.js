import {createSelector} from 'reselect'

import {CREATE_QUEUE} from './actions'
import {selectors as getTracks} from './tracks'

const initialState = {
  id: null,
  selectedItemId: null,
  selectedItemOffset: null,
  selectedMetadataItemId: null,
  items: [],
  size: 0,
  totalCount: 0,
  totalSize: 0,
  shuffled: false,
  sourceURI: null,
}

const rootSelector = (state) => state.queue

export const selectors = {
  track: createSelector(
    rootSelector, getTracks.values,
    (root, allTracks) => {
      const trackId = root.selectedMetadataItemId
      return allTracks.get(trackId)
    }),
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_QUEUE.SUCCESS:
      return {
        ...state,
        ...action.value.result,
      }

    default:
      return state
  }
}
