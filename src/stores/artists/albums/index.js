import {actionTypes} from 'redux-localstorage'
import {AsyncMapReducer} from '@stayradiated/mandarin'

import {rehydrateMapReducer} from '../../../utils'
import {FETCH_ARTIST_ALBUMS} from '../../constants'

const fetchArtistAlbumsReducer = new AsyncMapReducer({
  defaultMap: [],
  getId: (action) => action.payload.artistId,
  getValue: (action) => action.value.result.items,
  updateMap: (newMap) => (oldMap) => {
    return oldMap.concat(newMap)
  },
})

export default function (state = fetchArtistAlbumsReducer.initialState, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return rehydrateMapReducer(state, action.payload, ['artists', 'albums'])

    case FETCH_ARTIST_ALBUMS.REQUEST:
      return fetchArtistAlbumsReducer.handleRequest(state, action)

    case FETCH_ARTIST_ALBUMS.FAILURE:
      return fetchArtistAlbumsReducer.handleFailure(state, action)

    case FETCH_ARTIST_ALBUMS.SUCCESS:
      return fetchArtistAlbumsReducer.handleSuccess(state, action)

    default:
      return state
  }
}
