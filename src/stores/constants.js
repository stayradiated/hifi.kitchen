import {c} from '@stayradiated/mandarin'

export const PLAYLIST = 'playlist'
export const ARTIST   = 'artist'
export const ALBUM    = 'album'
export const TRACK    = 'track'
export const SEARCH   = 'search'
export const PLAYER   = 'player'

export const CONFIG_TIMELINE_UPDATE_TIME = 1000 * 10

export const FETCH_QUEUE             = c('FETCH_QUEUE')
export const CREATE_QUEUE            = c('CREATE_QUEUE')
export const FETCH_LIBRARY_SECTIONS  = c('FETCH_LIBRARY_SECTIONS')
export const FETCH_PLAYLIST_TRACKS   = c('FETCH_PLAYLIST_TRACKS')
export const RATE_TRACK              = c('RATE_TRACK')
export const FETCH_SEARCH_RESULTS    = c('FETCH_SEARCH_RESULTS')
export const UPDATE_TIMELINE         = c('UPDATE_TIMELINE')

// albums
export const FETCH_ALBUM          = c('FETCH_ALBUM')
export const FETCH_LIBRARY_ALBUMS = c('FETCH_LIBRARY_ALBUMS')
export const FETCH_ALBUM_TRACKS   = c('FETCH_ALBUM_TRACKS')
export const SORT_LIBRARY_ALBUMS  = 'SORT_LIBRARY_ALBUMS'

// artists
export const FETCH_ARTIST          = c('FETCH_ARTIST')
export const FETCH_LIBRARY_ARTISTS = c('FETCH_LIBRARY_ARTISTS')
export const FETCH_ARTIST_ALBUMS   = c('FETCH_ARTIST_ALBUMS')
export const SORT_LIBRARY_ARTISTS  = 'SORT_LIBRARY_ARTISTS'

// playlists
export const FETCH_PLAYLIST                  = c('FETCH_PLAYLIST')
export const SORT_LIBRARY_PLAYLISTS          = 'SORT_LIBRARY_PLAYLISTS'
export const FETCH_LIBRARY_PLAYLISTS         = c('FETCH_LIBRARY_PLAYLISTS')
export const SORT_LIBRARY_PLAYLISTS_REGULAR  = 'SORT_LIBRARY_PLAYLISTS_REGULAR'
export const FETCH_LIBRARY_PLAYLISTS_REGULAR = c('FETCH_LIBRARY_PLAYLISTS_REGULAR')
export const ADD_TRACK_TO_PLAYLIST           = c('ADD_TRACK_TO_PLAYLIST')

// tracks
export const FETCH_TRACK          = c('FETCH_TRACK')
export const FETCH_LIBRARY_TRACKS = c('FETCH_LIBRARY_TRACKS')
export const SORT_LIBRARY_TRACKS  = 'SORT_LIBRARY_TRACKS'

// servers
export const FETCH_ACCOUNT_SERVERS = c('FETCH_ACCOUNT_SERVERS')
export const FETCH_SERVER_STATUS   = c('FETCH_SERVER_STATUS')

// plex
export const PLEX_INITIALIZE          = 'PLEX_INITIALIZE'
export const PLEX_USE_SERVER          = 'PLEX_USE_SERVER'
export const PLEX_USE_LIBRARY_SECTION = 'PLEX_USE_LIBRARY_SECTION'
export const PLEX_AUTHENTICATE        = c('PLEX_AUTHENTICATE')
export const PLEX_FETCH_PIN           = c('PLEX_FETCH_PIN')
export const PLEX_CHECK_PIN           = c('PLEX_CHECK_PIN')
export const PLEX_READY               = 'PLEX_READY'

export const PLAY_QUEUE_ITEM         = 'PLAY_QUEUE_ITEM'
export const SET_PLAYER_CURRENT_TIME = 'SET_PLAYER_CURRENT_TIME'
export const STOP_QUEUE              = 'STOP_QUEUE'
export const MOVE_PLAY_QUEUE_ITEM    = c('MOVE_PLAY_QUEUE_ITEM')
export const SHUFFLE_PLAY_QUEUE      = c('SHUFFLE_PLAY_QUEUE')
export const UNSHUFFLE_PLAY_QUEUE    = c('UNSHUFFLE_PLAY_QUEUE')

export const PLAYER_STATE_PLAYING = 'playing'
export const PLAYER_STATE_PAUSED  = 'paused'
export const PLAYER_STATE_STOPPED = 'stopped'

// ui
export const UI_SET_DISPLAY_QUEUE   = 'UI_SET_DISPLAY_QUEUE'
export const UI_SET_DISPLAY_PLAYER  = 'UI_SET_DISPLAY_PLAYER'
export const UI_SET_TRACK_TO_ADD_TO_PLAYLIST = 'UI_SET_TRACK_TO_ADD_TO_PLAYLIST'
