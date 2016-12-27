import {
  c, cacheMap, AsyncMapReducer, createMapSelector,
} from '@stayradiated/mandarin'

import plex from '../plex'

export const FETCH_ALBUM_TRACKS = c`FETCH_ALBUM_TRACKS`

export const selectors = createMapSelector((state) => state.albumTracks)

export function forceFetchAlbumTracks (albumId) {
  return {
    types: FETCH_ALBUM_TRACKS,
    payload: {albumId},
    meta: {
      async: plex.albumTracks(albumId),
    },
  }
}

export const fetchAlbumTracks = cacheMap(
  forceFetchAlbumTracks,
  (albumId) => ({
    id: albumId,
    selectors,
  }),
)

const fetchAlbumTracksReducer = new AsyncMapReducer({
  defaultMap: [],
  getId: (action) => action.payload.albumId,
  getValue: (action) => action.value.result.items,
  updateMap: (newMap) => (oldMap) => {
    return oldMap.concat(newMap)
  },
})

export default function (state = fetchAlbumTracksReducer.initialState, action) {
  switch (action.type) {
    case FETCH_ALBUM_TRACKS.REQUEST:
      return fetchAlbumTracksReducer.handleRequest(state, action)

    case FETCH_ALBUM_TRACKS.FAILURE:
      return fetchAlbumTracksReducer.handleFailure(state, action)

    case FETCH_ALBUM_TRACKS.SUCCESS:
      return fetchAlbumTracksReducer.handleSuccess(state, action)

    default:
      return state
  }
}
