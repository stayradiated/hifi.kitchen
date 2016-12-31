import {createSelector} from 'reselect'
import {createValueSelector, exportValue} from '@stayradiated/mandarin'

import {values as getAllArtists} from '../artists/all/selectors'
import {values as getAllAlbums} from '../albums/all/selectors'
import {values as getAllTracks} from '../tracks/all/selectors'
import {values as getAllPlaylists} from '../playlists/all/selectors'

const selectors = createValueSelector((state) => state.search)

const artistHub = exportValue(selectors, 'artist')
const albumHub = exportValue(selectors, 'album')
const playlistHub = exportValue(selectors, 'playlist')
const trackHub = exportValue(selectors, 'track')

const resolve = (hub, allItems) =>
  hub.items.map((item) => allItems.get(item.id))

module.exports = {
  ...selectors,

  artists: createSelector(artistHub, getAllArtists, resolve),
  albums: createSelector(albumHub, getAllAlbums, resolve),
  tracks: createSelector(trackHub, getAllTracks, resolve),
  playlists: createSelector(playlistHub, getAllPlaylists, resolve),
}
