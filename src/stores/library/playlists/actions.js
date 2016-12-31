import plex from '../../../plex'
import {FETCH_LIBRARY_PLAYLISTS} from '../../constants'
import * as selectors from './selectors'

export function fetchLibraryPlaylists (section, size) {
  return (dispatch, getState) => {
    const state = getState()
    const start = selectors.value(state).length

    return dispatch({
      types: FETCH_LIBRARY_PLAYLISTS,
      payload: {start, size},
      meta: {
        async: plex.normalizedPlaylists(),
      },
    })
  }
}

