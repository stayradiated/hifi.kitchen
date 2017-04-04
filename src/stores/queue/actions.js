import {normalize} from 'perplexed'

import {
  SHUFFLE_PLAY_QUEUE,
  UNSHUFFLE_PLAY_QUEUE,
  FETCH_QUEUE,
  CREATE_QUEUE,
  PLAY_QUEUE_ITEM,
  STOP_QUEUE,
  MOVE_PLAY_QUEUE_ITEM,
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

export const createQueueFromArtist = (artist, track) =>
  createQueueFromURI({
    source: artist.key,
    key: track.key,
  }, track)

export const createQueueFromPlaylist = (playlistId, track) =>
  createQueue({
    playlistId,
    key: track.key,
  }, track)

export const playQueueItem = (queueItemId) => ({
  type: PLAY_QUEUE_ITEM,
  payload: {
    selectedItemId: queueItemId,
  },
})

export const moveQueueItem = ({newIndex, oldIndex}) => (dispatch, getState) => {
  const state = getState()
  const queueId = selectors.queueId(state)
  const items = selectors.items(state)

  const playQueueId = items[oldIndex].id
  const afterQueueId = items[newIndex - (oldIndex > newIndex ? 1 : 0)].id

  return dispatch({
    types: MOVE_PLAY_QUEUE_ITEM,
    payload: {newIndex, oldIndex},
    meta: {
      plex: ({library}) =>
        normalize(library.movePlayQueueItem(queueId, playQueueId, afterQueueId)),
    },
  })
}

export const shuffleQueue = () => (dispatch, getState) => {
  const state = getState()
  const playQueueId = selectors.queueId(state)
  return dispatch({
    types: SHUFFLE_PLAY_QUEUE,
    meta: {
      plex: ({library}) => normalize(library.shufflePlayQueue(playQueueId)),
    },
  })
}

export const unshuffleQueue = () => (dispatch, getState) => {
  const state = getState()
  const playQueueId = selectors.queueId(state)
  return dispatch({
    types: UNSHUFFLE_PLAY_QUEUE,
    meta: {
      plex: ({library}) => normalize(library.unshufflePlayQueue(playQueueId)),
    },
  })
}

export const toggleShuffleQueue = () => (dispatch, getState) => {
  const state = getState()
  const shuffled = selectors.shuffled(state)
  return dispatch(shuffled ? unshuffleQueue() : shuffleQueue())
}

export const jumpToRelativeQueueItem = (delta) => (dispatch, getState) => {
  const state = getState()
  const selectedItemId = selectors.selectedItemId(state)
  const items = selectors.items(state)
  const index = items.findIndex((queueItem) => queueItem.id === selectedItemId)
  const nextIndex = index + delta
  const nextQueueItem = items[nextIndex]
  return dispatch(playQueueItem(nextQueueItem.id))
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
