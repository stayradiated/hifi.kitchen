import {normalizeSync} from 'perplexed'

import albums from '../../data/albums.json'
import artists from '../../data/artists.json'
import playlists from '../../data/playlists.json'
import servers from '../../data/servers.json'
import libraries from '../../data/libraries.json'
import tracks from '../../data/tracks.json'
import search from '../../data/search.json'

const getId = (artist) => artist.id
const toObject = (obj, item) => {
  obj[item.id] = item
  return obj
}

const normalizedAlbums = normalizeSync(albums)
const albumIds = normalizedAlbums.result.map(getId)
const allAlbums = normalizedAlbums.result.reduce(toObject, {})

console.log(normalizedAlbums)

const normalizedArtists = normalizeSync(artists)
const artistIds = normalizedArtists.result.map(getId)
const allArtists = normalizedArtists.result.reduce(toObject, {})

const normalizedPlaylists = normalizeSync(playlists)
const playlistIds = normalizedPlaylists.result.map(getId)
const allPlaylists = normalizedPlaylists.result.reduce(toObject, {})

const normalizedTracks = normalizeSync(tracks)
const trackIds = normalizedTracks.result.map(getId)
const allTracks = normalizedTracks.result.reduce(toObject, {})

// const normalizedSearch = normalizeSync(search)
// const searchIds = normalizedSearch.result.map(getId)
// const allSearch = normalizedSearch.result.reduce(toObject, {})

// const normalizedLibraries = normalizeSync(libraries)
// const libraryIds = normalizedLibraries.result.map(getId)
// const allLibraries = normalizedLibraries.result.reduce(toObject, {})

// const normalizedServers = normalizeSync(servers)
// const serverIds = normalizedServers.result.map(getId)
// const allServer = normalizedServers.result.reduce(toObject, {})

const values = {
  allAlbums,
  allArtists,
  allPlaylists,
  allTracks,
}

export {
  albums, artists, playlists, servers, libraries, tracks, search,
  albumIds,
  artistIds,
  playlistIds,
  trackIds,
  values,
}
