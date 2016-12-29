import {actionTypes} from 'redux-localstorage'
import {
  AsyncMapReducer,
  createObjectMergeFunction,
} from '@stayradiated/mandarin'

import {rehydrateMapReducer} from '../../../utils'
import {FETCH_ALBUM, FETCH_LIBRARY_ALBUMS} from '../../constants'

const reducer = new AsyncMapReducer({
  getId: (action) => action.payload.albumId,
  getValue: (action) => {
    const {albumId} = action.payload
    const {entities} = action.value
    return entities.albums[albumId]
  },
})

const mergeAlbums = createObjectMergeFunction({
  getId: (album) => album.id,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return rehydrateMapReducer(state, action.payload, ['albums', 'all'])

    case FETCH_ALBUM.REQUEST:
      return reducer.handleRequest(state, action)

    case FETCH_ALBUM.FAILURE:
      return reducer.handleFailure(state, action)

    case FETCH_ALBUM.SUCCESS:
      return reducer.handleSuccess(state, action)

    case FETCH_LIBRARY_ALBUMS.SUCCESS:
      return {
        ...state,
        values: mergeAlbums(state.values, action.value.entities.albums),
      }

    default:
      return state
  }
}
