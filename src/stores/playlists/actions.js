import {ADD_TRACK_TO_PLAYLIST} from '../constants'

import {value as getLibrarySections} from '../library/sections/selectors'
import {selectPlex} from '../plex/instance'
import {selectAllTracks} from '../tracks/all'

const addTrackToPlaylist = (trackId, playlistId) => (dispatch, getState) => {
  const state = getState()

  const sections = getLibrarySections(state)
  const sectionId = selectPlex.librarySectionId(state)
  const section = sections.find((s) => s.id === sectionId)

  const allTracks = selectAllTracks.values(state)
  const track = allTracks.get(trackId)
  const source = track.key

  const path = encodeURIComponent(source)
  const uri = `library://${section.uuid}/item/${path}`

  return dispatch({
    types: ADD_TRACK_TO_PLAYLIST,
    payload: {trackId, playlistId},
    meta: {
      plex: ({library}) => library.addToPlaylist(playlistId, uri),
    },
  })
}

export {
  addTrackToPlaylist,
}
