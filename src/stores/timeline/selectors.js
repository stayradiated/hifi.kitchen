import {createSelector} from 'reselect'

import {PLAYER_STATE_PAUSED} from '../constants'

import {trackId as selectTrackId} from '../queue/selectors'

export const root = (state) => state.timeline
export const queueItems = createSelector(root, (_root) => _root.queueItems)

export const currentQueueItem = createSelector(
  queueItems, selectTrackId,
  (_queueItems, _trackId) => _queueItems.get(_trackId),
)

export const currentTime = createSelector(
  currentQueueItem,
  (_currentQueueItem) => {
    return _currentQueueItem
      ? _currentQueueItem.currentTime
      : 0
  },
)

export const playerState = createSelector(
  currentQueueItem,
  (_currentQueueItem) => {
    return _currentQueueItem
      ? _currentQueueItem.playerState
      : PLAYER_STATE_PAUSED
  },
)
