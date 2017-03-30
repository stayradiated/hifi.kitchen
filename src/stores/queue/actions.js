import {normalize} from 'perplexed'

import {
  FETCH_QUEUE,
  CREATE_QUEUE,
  SELECT_QUEUE_ITEM,
  STOP_QUEUE,
} from '../constants'

import {selectPlex} from '../plex/instance'
import {value as getLibrarySections} from '../library/sections/selectors'
import * as selectors from './selectors'

export const fetchQueue = (queueId) => ({
  types: FETCH_QUEUE,
  payload: {queueId},
  meta: {
    plex: ({library}) => normalize(library.playQueue(queueId)),
  },
})

export const createQueue = (options, initialTrack) => ({
  types: CREATE_QUEUE,
  payload: {...options, initialTrack},
  meta: {
    plex: ({library}) => normalize(library.createQueue(options)),
  },
})

export const createQueueFromURI = (options, initialTrack) => {
  const {source, key} = options

  return (dispatch, getState) => {
    const state = getState()
    const sections = getLibrarySections(state)
    const sectionId = selectPlex.librarySectionId(state)
    const section = sections.find((s) => s.id === sectionId)

    const path = encodeURIComponent(source)
    const uri = `library://${section.uuid}/directory/${path}`

    return dispatch(createQueue({uri, key}, initialTrack))
  }
}

export const createQueueFromPlexMix = (track) =>
  createQueueFromURI({
    source: track.plexMix.key,
  }, track)

export const createQueueFromAlbum = (album, track) =>
  createQueueFromURI({
    source: album.key,
    key: track.key,
  }, track)

export const createQueueFromPlaylist = (playlistId, track) =>
  createQueue({
    playlistId,
    key: track.key,
  }, track)

export const selectQueueItem = (index) => ({
  type: SELECT_QUEUE_ITEM,
  payload: {
    selectedItemOffset: index,
  },
})

export const playNextTrack = () => {
  return (dispatch, getState) => {
    const state = getState()
    const index = selectors.selectedItemOffset(state) + 1
    return dispatch(selectQueueItem(index))
  }
}

export const playPrevTrack = () => {
  return (dispatch, getState) => {
    const state = getState()
    const index = selectors.selectedItemOffset(state) - 1
    return dispatch(selectQueueItem(index))
  }
}

export const stopQueue = () => ({
  type: STOP_QUEUE,
})
