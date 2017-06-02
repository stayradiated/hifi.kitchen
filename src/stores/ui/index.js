import {createSelector} from 'reselect'

const SET_DISPLAY_QUEUE = 'SET_DISPLAY_QUEUE'
const SET_DISPLAY_PLAYER = 'SET_DISPLAY_PLAYER'

const initialState = {
  displayQueue: false,
  displayPlayer: false,
}

const root = (state) => state.ui
const selectDisplayQueue = createSelector(root, (_root) => _root.displayQueue)
const selectDisplayPlayer = createSelector(root, (_root) => _root.displayPlayer)

const setDisplayQueue = (value) => ({
  type: SET_DISPLAY_QUEUE,
  payload: value,
})

const setDisplayPlayer = (value) => ({
  type: SET_DISPLAY_PLAYER,
  payload: value,
})

const toggleDisplayQueue = () => (dispatch, getState) =>
  dispatch(setDisplayQueue(!selectDisplayQueue(getState())))

const toggleDisplayPlayer = () => (dispatch, getState) =>
  dispatch(setDisplayPlayer(!selectDisplayPlayer(getState())))

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_QUEUE:
      return {
        ...state,
        displayQueue: action.payload,
      }
    case SET_DISPLAY_PLAYER:
      return {
        ...state,
        displayPlayer: action.payload,
      }
    default:
      return state
  }
}

export {
  reducer,
  setDisplayQueue,
  toggleDisplayQueue,
  selectDisplayQueue,
  setDisplayPlayer,
  toggleDisplayPlayer,
  selectDisplayPlayer,
}

export default reducer
