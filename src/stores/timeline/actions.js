import plex from '../../plex'

import {
  SET_PLAYER_CURRENT_TIME,
  UPDATE_TIMELINE,
  CONFIG_TIMELINE_UPDATE_TIME,
  PLAYER_STATE_STOPPED,
  PLAYER_STATE_PAUSED,
  PLAYER_STATE_PLAYING,
} from '../constants'

import * as selectTimeline from './selectors'
import {selectAllTracks} from '../tracks/all'

export const updateTimeline = (options) => ({
  types: UPDATE_TIMELINE,
  payload: options,
  meta: {
    async: plex.timeline(options),
  },
})

export const updatePlayerState = (playerState, queueItem) => {
  if (queueItem == null) {
    throw new Error('queueItem cannot be null')
  }

  return (dispatch, getState) => {
    const state = getState()
    const currentTime = selectTimeline.currentTime(state)
    const allTracks = selectAllTracks.values(state)
    const track = allTracks.get(queueItem.track)

    const timeout = setTimeout(() => {
      if (playerState !== PLAYER_STATE_STOPPED) {
        dispatch(updatePlayerState(playerState, queueItem))
      }
    }, CONFIG_TIMELINE_UPDATE_TIME)

    return dispatch(updateTimeline({
      queueItemId: queueItem.id,
      ratingKey: track.ratingKey,
      key: track.id,
      playerState,
      currentTime,
      duration: track.duration,
      timeout,
    }))
  }
}

export const sendTimelinePlay = (queueItem) => {
  return updatePlayerState(PLAYER_STATE_PLAYING, queueItem)
}

export const sendTimelinePause = (queueItem) => {
  return updatePlayerState(PLAYER_STATE_PAUSED, queueItem)
}

export const sendTimelineStop = (queueItem) => {
  return updatePlayerState(PLAYER_STATE_STOPPED, queueItem)
}

export const setPlayerCurrentTime = (currentTime) => ({
  type: SET_PLAYER_CURRENT_TIME,
  payload: {currentTime},
})
