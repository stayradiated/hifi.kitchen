import {createSelector} from 'reselect'

import {
  UI_SET_DISPLAY_QUEUE,
  UI_SET_DISPLAY_PLAYER,
  UI_SET_TRACK_TO_ADD_TO_PLAYLIST,
} from '../constants'

const initialState = {
  displayQueue: false,
  displayPlayer: false,
  trackToAddToPlaylist: null,
}

const root = (state) => state.ui
const selectDisplayQueue = createSelector(root, (_root) => _root.displayQueue)
const selectDisplayPlayer = createSelector(root, (_root) => _root.displayPlayer)
const selectTrackToAddToPlaylist = createSelector(root, (_root) => _root.trackToAddToPlaylist)

/**
 * DISPLAY QUEUE
 */

const setDisplayQueue = (value) => ({
  type: UI_SET_DISPLAY_QUEUE,
  payload: value,
})

const toggleDisplayQueue = () => (dispatch, getState) =>
  dispatch(setDisplayQueue(!selectDisplayQueue(getState())))

/**
 * DISPLAY PLAYER
 */

const setDisplayPlayer = (value) => ({
  type: UI_SET_DISPLAY_PLAYER,
  payload: value,
})

const toggleDisplayPlayer = () => (dispatch, getState) =>
  dispatch(setDisplayPlayer(!selectDisplayPlayer(getState())))

/**
 * ADD TO PLAYLIST
 */

const setTrackToAddToPlaylist = (trackId) => ({
  type: UI_SET_TRACK_TO_ADD_TO_PLAYLIST,
  payload: trackId,
})

/**
 * REDUCER
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_SET_DISPLAY_QUEUE:
      return {
        ...state,
        displayQueue: action.payload,
      }
    case UI_SET_DISPLAY_PLAYER:
      return {
        ...state,
        displayPlayer: action.payload,
      }
    case UI_SET_TRACK_TO_ADD_TO_PLAYLIST:
      return {
        ...state,
        trackToAddToPlaylist: action.payload,
      }
    default:
      return state
  }
}

export {
  reducer,

  setDisplayQueue,
  toggleDisplayQueue,
  setDisplayPlayer,
  toggleDisplayPlayer,
  setTrackToAddToPlaylist,

  selectDisplayPlayer,
  selectDisplayQueue,
  selectTrackToAddToPlaylist,
}

export default reducer
