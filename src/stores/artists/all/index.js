import {actionTypes} from 'redux-localstorage'
import {
  AsyncMapReducer,
  createObjectMergeFunction,
} from '@stayradiated/mandarin'

import {rehydrateMapReducer} from '../../../utils'
import {FETCH_ARTIST, FETCH_LIBRARY_ARTISTS} from '../../constants'

const reducer = new AsyncMapReducer({
  getId: (action) => action.payload.artistId,
  getValue: (action) => {
    const {artistId} = action.payload
    const {entities} = action.value
    return entities.artists[artistId]
  },
})

const mergeArtists = createObjectMergeFunction({
  getId: (artist) => artist.id,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return rehydrateMapReducer(state, action.payload, ['artists', 'all'])

    case FETCH_ARTIST.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_ARTIST.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_ARTIST.SUCCESS:
      return reducer.handleSuccess(state, action)

    case FETCH_LIBRARY_ARTISTS.SUCCESS:
      return {
        ...state,
        values: mergeArtists(state.values, action.value.entities.artists),
      }

    default:
      return state
  }
}
