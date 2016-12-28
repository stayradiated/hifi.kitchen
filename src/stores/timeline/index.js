import {
  TIMELINE_STATE_STOPPED,
  SET_PLAYER_CURRENT_TIME,
  UPDATE_TIMELINE,
} from '../constants'

const initialState = {
  currentTime: 0,
  playerState: TIMELINE_STATE_STOPPED,
  timeout: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_CURRENT_TIME:
      const {currentTime} = action.payload
      return {
        ...state,
        currentTime,
      }

    case UPDATE_TIMELINE.REQUEST:
      const {timeout, playerState} = action.payload
      clearTimeout(state.timeout)
      return {
        ...state,
        timeout,
        playerState,
      }

    default:
      return state
  }
}
