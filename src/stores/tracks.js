import {
  AsyncMapReducer, createMapSelector, createObjectMergeFunction,
} from '@stayradiated/mandarin'

import {CREATE_QUEUE, FETCH_ALBUM_TRACKS, RATE_TRACK} from './actions'

export const selectors = createMapSelector((state) => state.tracks)

const reducer = new AsyncMapReducer({
  getValue: (action) => action.value,
})

const mergeTracks = createObjectMergeFunction({
  getId: (track) => track.id,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case FETCH_ALBUM_TRACKS.SUCCESS:
      return {
        ...state,
        values: mergeTracks(state.values, action.value.entities.tracks),
      }

    case CREATE_QUEUE.SUCCESS:
      return {
        ...state,
        values: mergeTracks(state.values, action.value.entities.tracks),
      }

    case RATE_TRACK.SUCCESS:
      const {trackId, rating} = action.payload
      const valueMap = new Map(state.values)
      valueMap.set(trackId, {
        ...valueMap.get(trackId),
        userRating: rating,
      })
      return {
        ...state,
        values: valueMap,
      }

    default:
      return state
  }
}
