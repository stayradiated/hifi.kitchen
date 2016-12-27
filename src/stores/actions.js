import {c, cacheMap, cacheValue} from '@stayradiated/mandarin'

import plex from '../plex'

import {selectors as getAlbumTracks} from './albumTracks'
import {selectors as getAlbums} from './albums'
import {selectors as getLibrarySections} from './librarySections'
import {selectors as getLibrary} from './library'
import {selectors as getQueue} from './queue'

export const CREATE_QUEUE = c`CREATE_QUEUE`
export const FETCH_ALBUM = c`FETCH_ALBUM`
export const FETCH_ALBUM_TRACKS = c`FETCH_ALBUM_TRACKS`
export const FETCH_LIBRARY_ALBUMS = c`FETCH_LIBRARY_ALBUMS`
export const FETCH_LIBRARY_SECTIONS = c`FETCH_LIBRARY_SECTIONS`
export const RATE_TRACK = c`RATE_TRACK`

export const SELECT_QUEUE_ITEM = 'SELECT_QUEUE_ITEM'

export const createQueueFromAlbum = (sectionId, album, track) => {
  return (dispatch, getState) => {
    const state = getState()
    const sections = getLibrarySections.value(state)
    const section = sections.find((s) => s.id === sectionId)

    const path = encodeURIComponent(album.key)
    const uri = `library://${section.uuid}/directory/${path}`

    return dispatch({
      types: CREATE_QUEUE,
      payload: {uri},
      meta: {
        async: plex.createQueue({
          uri,
          key: track.key,
          shuffle: false,
          repeate: false,
          includeChapters: false,
          includeRelated: false,
        }),
      },
    })
  }
}

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
    selectors: getAlbumTracks,
  }),
)

export const forceFetchAlbum = (albumId) => ({
  types: FETCH_ALBUM,
  payload: {albumId},
  meta: {
    async: plex.fetchAlbum(albumId),
  },
})

export const fetchAlbum = cacheMap(forceFetchAlbum, (albumId) => ({
  id: albumId,
  selectors: getAlbums,
}))

export function fetchLibraryAlbums (section, size) {
  return (dispatch, getState) => {
    const start = getLibrary.value(getState()).length

    return dispatch({
      types: FETCH_LIBRARY_ALBUMS,
      payload: {start, size},
      meta: {
        async: plex.albums(section, start, size),
      },
    })
  }
}

export const forceFetchLibrarySections = () => ({
  types: FETCH_LIBRARY_SECTIONS,
  meta: {
    async: plex.sections(),
  },
})

export const fetchLibrarySections = cacheValue(
  forceFetchLibrarySections,
  () => ({
    selectors: getLibrarySections,
  }),
)

export const rateTrack = (track, rating) => ({
  types: RATE_TRACK,
  payload: {trackId: track.id, rating},
  meta: {
    async: plex.rate(track.id, rating),
  },
})

export const selectQueueItem = (index) => ({
  type: SELECT_QUEUE_ITEM,
  payload: {
    selectedItemOffset: index,
  },
})

export const playNextTrack = () => {
  return (dispatch, getState) => {
    const state = getState()
    const index = getQueue.selectedItemOffset(state) + 1
    return dispatch(selectQueueItem(index))
  }
}

export const playPrevTrack = () => {
  return (dispatch, getState) => {
    const state = getState()
    const index = getQueue.selectedItemOffset(state) - 1
    return dispatch(selectQueueItem(index))
  }
}
