import {createSelector} from 'reselect'
import {createValueSelector, exportValue} from '@stayradiated/mandarin'

import {selectAllArtists} from '../artists/all'
import {selectAllAlbums} from '../albums/all'
import {selectAllTracks} from '../tracks/all'
import {selectAllPlaylists} from '../playlists/all'

const selectors = createValueSelector((state) => state.search)

const artistHub = exportValue(selectors, 'artist')
const albumHub = exportValue(selectors, 'album')
const playlistHub = exportValue(selectors, 'playlist')
const trackHub = exportValue(selectors, 'track')

const resolve = (hub, allItems) =>
  hub.items.map((item) => allItems.get(item.id))

module.exports = {
  ...selectors,

  artists: createSelector(artistHub, selectAllArtists.values, resolve),
  albums: createSelector(albumHub, selectAllAlbums.values, resolve),
  tracks: createSelector(trackHub, selectAllTracks.values, resolve),
  playlists: createSelector(playlistHub, selectAllPlaylists.values, resolve),
}
