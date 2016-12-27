import {createSelector} from 'reselect'
import {c} from '@stayradiated/mandarin'

import plex from '../plex'

import {selectors as getLibrarySections} from './librarySections'

export const PLAY_TRACK = 'PLAY_TRACK'
export const CREATE_QUEUE = c`CREATE_QUEUE`

const initialState = {
  track: null,
  queue: null,
}

export const playTrack = (track) => ({
  type: PLAY_TRACK,
  payload: {track},
})

export const createQueueFromAlbum = (sectionId, album) => {
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
          key: album.key,
          shuffle: false,
          repeate: false,
          includeChapters: false,
          includeRelated: false,
        }),
      },
    })
  }
}

const rootSelector = (state) => state.queue

export const selectors = {
  track: createSelector(rootSelector, (root) => root.track),
}

export default function (state = initialState, action) {
  switch (action.type) {
    case PLAY_TRACK:
      return {
        ...state,
        track: action.payload.track,
      }

    case CREATE_QUEUE.SUCCESS:
      return {
        ...state,
        queue: action.value.result,
      }

    default:
      return state
  }
}
