import qs from 'qs'
import PlexAPI from 'plex-api'
import {normalize} from 'normalizr'

import {parseSectionContainer} from './section'
import {albumContainerSchema, parseAlbumContainer} from './album'
import {trackContainerSchema, parseTrackContainer} from './track'
import {playQueueSchema, parsePlayQueue} from './playQueue'

export default class Client {
  constructor (config) {
    this.api = new PlexAPI(config.server)
  }

  root () {
    return this.api.query('/')
  }

  sections () {
    return this.api.query('/library/sections')
      .then((res) => parseSectionContainer(res))
  }

  section (id) {
    return this.api.query(`/library/sections/${id}`)
  }

  queryWithRange (options = {start: 0, size: 20}) {
    return this.api.query({
      ...options,
      extraHeaders: {
        'X-Plex-Container-Start': options.start.toString(),
        'X-Plex-Container-Size': options.size.toString(),
      },
    })
  }

  albums (section, start, size) {
    const params = qs.stringify({
      type: 9,
      sort: 'addedAt:desc',
    })
    const uri = `/library/sections/${section}/all?${params}`

    return this.queryWithRange({uri, start, size})
      .then((res) => parseAlbumContainer(res))
      .then((res) => normalize(res, albumContainerSchema))
  }

  albumTracks (albumId, options = {}) {
    const params = qs.stringify({
      includeRelated: options.includeRelated ? 1 : 0,
    })
    const uri = `/library/metadata/${albumId}/children?${params}`

    return this.api.query({uri})
      .then((res) => parseTrackContainer(res))
      .then((res) => normalize(res, trackContainerSchema))
  }

  filter () {
    return this.api.query('/library/sections/1/albums?year=2016')
  }

  search (query) {
    const params = qs.stringify({
      type: 10,
      query,
    })
    return this.api.query(`/library/sections/1/search?${params}`)
  }

  transcode (options) {
    return this.signUrl('/photo/:/transcode', options)
  }

  signUrl (path, options) {
    const params = qs.stringify({
      ...options,
      'X-Plex-Token': this.api.authToken,
    })
    return `//${this.api.serverUrl}${path}?${params}`
  }

  rate (trackId, rating) {
    const params = qs.stringify({
      key: trackId,
      identifier: 'com.plexapp.plugins.library',
      rating,
    })
    return this.api.perform(`/:/rate?${params}`)
  }

  createQueue (options = {}) {
    const params = qs.stringify({
      type: 'audio',
      uri: options.uri,
      key: options.key,
      shuffle: options.shuffle ? 1 : 0,
      repeat: options.repeat ? 1 : 0,
      includeChapters: options.includeChapters ? 1 : 0,
      includeRelated: options.includeRelated ? 1 : 0,
    })
    return this.api.postQuery(`/playQueues?${params}`)
      .then((res) => parsePlayQueue(res))
      .then((res) => normalize(res, playQueueSchema))
  }

  timeline () {
    // hasMDE: 1
    // ratingKey: 41417
    // key: '/library/metadata/41417',
    // state: 'stopped',
    // continuing: 1,
    // playQueueItemID: 184671,
    // time: 95203,
    // duration: 152973,
    //
    // hasMDE: 1,
    // ratingKey: 41418,
    // key: '/library/metadata/41418',
    // state: 'playing',
    // playQueueItemID: 184672,
    // time: 0,
    // duration: 209607,
  }
}
