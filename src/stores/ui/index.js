import {createSelector} from 'reselect'

const SET_DISPLAY_QUEUE = 'SET_DISPLAY_QUEUE'

const initialState = {
  displayQueue: false,
}

const root = (state) => state.ui
const selectDisplayQueue = createSelector(root, (_root) => _root.displayQueue)

const setDisplayQueue = (value) => ({
  type: SET_DISPLAY_QUEUE,
  payload: value,
})

const toggleDisplayQueue = () => (dispatch, getState) =>
  dispatch(setDisplayQueue(!selectDisplayQueue(getState())))

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY_QUEUE:
      return {
        ...state,
        displayQueue: action.payload,
      }
    default:
      return state
  }
}

export {
  setDisplayQueue,
  toggleDisplayQueue,
  reducer,
  selectDisplayQueue,
}

export default reducer
