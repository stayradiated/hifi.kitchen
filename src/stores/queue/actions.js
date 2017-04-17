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
import {selectAllTracks} from '../tracks/all'
import {selectAllAlbums} from '../albums/all'
import {selectAllArtists} from '../artists/all'
import {value as getLibrarySections} from '../library/sections/selectors'
import * as selectors from './selectors'

export const fetchQueue = (queueId) => ({
  types: FETCH_QUEUE,
  payload: {queueId},
  meta: {
    plex: ({library}) => normalize(library.playQueue(queueId)),
  },
})

export const createQueue = (options) => ({
  types: CREATE_QUEUE,
  payload: {...options},
  meta: {
    plex: ({library}) => normalize(library.createQueue(options)),
  },
})

export const createQueueFromURI = (options) => {
  const {source, key, initialTrackId} = options

  return (dispatch, getState) => {
    const state = getState()
    const sections = getLibrarySections(state)
    const sectionId = selectPlex.librarySectionId(state)
    const section = sections.find((s) => s.id === sectionId)

    const path = encodeURIComponent(source)
    const uri = `library://${section.uuid}/directory/${path}`

    return dispatch(createQueue({uri, key, initialTrackId}))
  }
}

export const createQueueFromPlexMix = (trackId) => (dispatch, getState) => {
  const state = getState()
  const allTracks = selectAllTracks.values(state)
  const track = allTracks.get(trackId)

  return dispatch(createQueueFromURI({
    source: track.plexMix.key,
    initialTrackId: trackId,
  }))
}

export const createQueueFromAlbum = (albumId, trackId) => (dispatch, getState) => {
  const state = getState()
  const allAlbums = selectAllAlbums.values(state)
  const allTracks = selectAllTracks.values(state)
  const album = allAlbums.get(albumId)
  const track = allTracks.get(trackId)

  return dispatch(createQueueFromURI({
    source: album.key,
    key: track.key,
    initialTrackId: trackId,
  }))
}

export const createQueueFromArtist = (artistId, trackId) => (dispatch, getState) => {
  const state = getState()
  const allArtists = selectAllArtists.values(state)
  const allTracks = selectAllTracks.values(state)
  const artist = allArtists.get(artistId)
  const track = allTracks.get(trackId)

  return dispatch(createQueueFromURI({
    source: artist.key,
    key: track.key,
    initialTrackId: trackId,
  }))
}

export const createQueueFromPlaylist = (playlistId, trackId) => (dispatch, getState) => {
  const state = getState()
  const allTracks = selectAllTracks.values(state)
  const track = allTracks.get(trackId)

  return dispatch(createQueue({
    playlistId,
    key: track.key,
    initialTrackId: trackId,
  }))
}

export const createQueueFromTrack = (trackId) => (dispatch, getState) => {
  const state = getState()
  const allTracks = selectAllTracks.values(state)
  const track = allTracks.get(trackId)

  return dispatch(createQueueFromURI({
    source: track.key,
    initialTrackId: trackId,
  }))
}

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
