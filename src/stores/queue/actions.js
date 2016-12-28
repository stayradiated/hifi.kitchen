import plex from '../../plex'
import {CREATE_QUEUE, SELECT_QUEUE_ITEM} from '../constants'
import {value as getLibrarySections} from '../library/sections/selectors'
import * as selectors from './selectors'

export const createQueue = (options) => {
  const {sectionId, source, key} = options

  return (dispatch, getState) => {
    const state = getState()
    const sections = getLibrarySections(state)
    const section = sections.find((s) => s.id === sectionId)

    const path = encodeURIComponent(source)
    const uri = `library://${section.uuid}/directory/${path}`

    return dispatch({
      types: CREATE_QUEUE,
      payload: options,
      meta: {
        async: plex.createQueue({
          uri,
          key,
        }),
      },
    })
  }
}

export const createQueueFromPlexMix = (sectionId, track) =>
  createQueue({
    sectionId,
    source: track.plexMix.key,
    initialTrack: track,
  })

export const createQueueFromAlbum = (sectionId, album, track) =>
  createQueue({
    sectionId,
    source: album.key,
    key: track.key,
    initialTrack: track,
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
