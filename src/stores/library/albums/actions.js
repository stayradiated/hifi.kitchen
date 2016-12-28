import plex from '../../../plex'
import {FETCH_LIBRARY_ALBUMS} from '../../constants'
import * as selectors from './selectors'

export function fetchLibraryAlbums (section, size) {
  return (dispatch, getState) => {
    const state = getState()
    const start = selectors.value(state).length

    return dispatch({
      types: FETCH_LIBRARY_ALBUMS,
      payload: {start, size},
      meta: {
        async: plex.albums(section, start, size),
      },
    })
  }
}

