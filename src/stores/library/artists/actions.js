import {normalizeType, ARTIST} from 'perplexed'

import plex from '../../../plex'
import {FETCH_LIBRARY_ARTISTS} from '../../constants'
import * as selectors from './selectors'

export function fetchLibraryArtists (section, size) {
  return (dispatch, getState) => {
    const state = getState()
    const start = selectors.value(state).length

    return dispatch({
      types: FETCH_LIBRARY_ARTISTS,
      payload: {start, size},
      meta: {
        async: plex.artists(section, {start, size})
          .then((res) => normalizeType(ARTIST, res)),
      },
    })
  }
}

