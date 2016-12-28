import {CREATE_QUEUE, SELECT_QUEUE_ITEM} from '../constants'

const initialState = {
  id: null,
  selectedItemOffset: null,
  items: [],
  shuffled: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_QUEUE.REQUEST:
      const {initialTrack} = action.payload
      return {
        ...state,
        selectedItemOffset: 0,
        items: [{
          track: initialTrack.id,
        }],
      }

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
