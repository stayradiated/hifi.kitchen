import {c} from '@stayradiated/mandarin'

export const CONFIG_TIMELINE_UPDATE_TIME = 1000 * 10

export const FETCH_QUEUE             = c('FETCH_QUEUE')
export const CREATE_QUEUE            = c('CREATE_QUEUE')
export const FETCH_LIBRARY_PLAYLISTS = c('FETCH_LIBRARY_PLAYLISTS')
export const FETCH_LIBRARY_SECTIONS  = c('FETCH_LIBRARY_SECTIONS')
export const FETCH_PLAYLIST          = c('FETCH_PLAYLIST')
export const FETCH_PLAYLIST_TRACKS   = c('FETCH_PLAYLIST_TRACKS')
export const RATE_TRACK              = c('RATE_TRACK')
export const SEARCH                  = c('SEARCH')
export const UPDATE_TIMELINE         = c('UPDATE_TIMELINE')

// albums
export const FETCH_LIBRARY_ALBUMS    = c('FETCH_LIBRARY_ALBUMS')
export const FETCH_ALBUM_TRACKS      = c('FETCH_ALBUM_TRACKS')

// artists
export const FETCH_LIBRARY_ARTISTS    = c('FETCH_LIBRARY_ARTISTS')
export const FETCH_ARTIST_ALBUMS      = c('FETCH_ARTIST_ALBUMS')

// servers
export const FETCH_ACCOUNT_SERVERS   = c('FETCH_ACCOUNT_SERVERS')
export const FETCH_SERVER_STATUS     = c('FETCH_SERVER_STATUS')

// plex
export const PLEX_INITIALIZE          = 'PLEX_INITIALIZE'
export const PLEX_USE_SERVER          = 'PLEX_USE_SERVER'
export const PLEX_USE_LIBRARY_SECTION = 'PLEX_USE_LIBRARY_SECTION'
export const PLEX_AUTHENTICATE        = c('PLEX_AUTHENTICATE')
export const PLEX_READY               = 'PLEX_READY'

export const SELECT_QUEUE_ITEM       = 'SELECT_QUEUE_ITEM'
export const SET_PLAYER_CURRENT_TIME = 'SET_PLAYER_CURRENT_TIME'
export const STOP_QUEUE              = 'STOP_QUEUE'

export const PLAYER_STATE_PLAYING = 'playing'
export const PLAYER_STATE_PAUSED  = 'paused'
export const PLAYER_STATE_STOPPED = 'stopped'
