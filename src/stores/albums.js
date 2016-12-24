import {
  c, cacheMap, AsyncMapReducer, createMapSelector, createObjectMergeFunction,
} from '@stayradiated/mandarin'

import plex from '../plex'
import {FETCH_LIBRARY_ALBUMS} from './library'

export const FETCH_ALBUM = c`FETCH_ALBUM`

export const selectors = createMapSelector((state) => state.albums)

export const forceFetchAlbum = (albumId) => ({
  types: FETCH_ALBUM,
  payload: {albumId},
  meta: {
    async: plex.fetchAlbum(albumId),
  },
})

export const fetchAlbum = cacheMap(forceFetchAlbum, (albumId) => ({
  id: albumId,
  selectors,
}))

const reducer = new AsyncMapReducer({
  getValue: (action) => action.value,
})

const mergeAlbums = createObjectMergeFunction({
  getId: (album) => album.id,
})

export default function (state = reducer.initialState, action) {
  switch (action.type) {
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
