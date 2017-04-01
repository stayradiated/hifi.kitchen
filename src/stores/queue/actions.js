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

export const selectQueueItem = (queueItemId) => ({
  type: SELECT_QUEUE_ITEM,
  payload: {
    selectedItemId: queueItemId,
  },
})

export const jumpToRelativeQueueItem = (delta) => (dispatch, getState) => {
  const state = getState()
  const selectedItemId = selectors.selectedItemId(state)
  const items = selectors.items(state)
  const index = items.findIndex((queueItem) => queueItem.id === selectedItemId)
  const nextIndex = index + delta
  const nextQueueItem = items[nextIndex]
  return dispatch(selectQueueItem(nextQueueItem.id))
}

export const playNextTrack = () => {
  return jumpToRelativeQueueItem(1)
}

export const playPrevTrack = () => {
  return jumpToRelativeQueueItem(-1)
}

export const stopQueue = () => ({
  type: STOP_QUEUE,
})
