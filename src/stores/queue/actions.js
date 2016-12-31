import {normalizeType, QUEUE} from 'perplexed'

import plex from '../../plex'

import {CREATE_QUEUE, SELECT_QUEUE_ITEM, STOP_QUEUE} from '../constants'

import {value as getLibrarySections} from '../library/sections/selectors'
import * as selectors from './selectors'

export const createQueue = (options, initialTrack) => ({
  types: CREATE_QUEUE,
  payload: {...options, initialTrack},
  meta: {
    async: plex.createQueue(options)
      .then((res) => normalizeType(QUEUE, res)),
  },
})

export const createQueueFromURI = (options, initialTrack) => {
  const {sectionId, source, key} = options

  return (dispatch, getState) => {
    const state = getState()
    const sections = getLibrarySections(state)
    const section = sections.find((s) => s.id === sectionId)

    const path = encodeURIComponent(source)
    const uri = `library://${section.uuid}/directory/${path}`

    return dispatch(createQueue({uri, key}, initialTrack))
  }
}

export const createQueueFromPlexMix = (sectionId, track) =>
  createQueueFromURI({
    sectionId,
    source: track.plexMix.key,
  }, track)

export const createQueueFromAlbum = (sectionId, album, track) =>
  createQueueFromURI({
    sectionId,
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
