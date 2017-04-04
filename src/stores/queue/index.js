import {actionTypes} from 'redux-localstorage'
import {
  FETCH_QUEUE,
  CREATE_QUEUE,
  PLAY_QUEUE_ITEM,
  STOP_QUEUE,
  MOVE_PLAY_QUEUE_ITEM,
} from '../constants'

const initialState = {
  id: null,
  selectedItemId: null,
  items: [],
  shuffled: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return (action.payload && action.payload.queue)
        ? action.payload.queue
        : state

    case CREATE_QUEUE.REQUEST:
      const {initialTrack} = action.payload
      return {
        ...state,
        selectedItemId: null,
        items: [{
          track: initialTrack.id,
        }],
      }

    case MOVE_PLAY_QUEUE_ITEM.REQUEST:
      const updatedItems = [...state.items]
      const {oldIndex, newIndex} = action.payload

      const item = updatedItems[oldIndex]
      updatedItems.splice(oldIndex, 1)
      updatedItems.splice(newIndex, 0, item)

      return {
        ...state,
        items: updatedItems,
      }

    case FETCH_QUEUE.SUCCESS:
    case CREATE_QUEUE.SUCCESS:
    case MOVE_PLAY_QUEUE_ITEM.SUCCESS:
      return {
        ...state,
        ...action.value.result.id,
      }

    case PLAY_QUEUE_ITEM:
      const {selectedItemId} = action.payload
      return {
        ...state,
        selectedItemId,
      }

    case STOP_QUEUE:
      return {
        ...state,
        id: null,
        selectedItemId: null,
        items: [],
      }

    default:
      return state
  }
}
