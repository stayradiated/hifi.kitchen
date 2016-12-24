import {
  AsyncMapReducer, createMapSelector, createObjectMergeFunction,
} from '@stayradiated/mandarin'

import {FETCH_ALBUM_TRACKS} from './albumTracks'

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

    default:
      return state
  }
}
