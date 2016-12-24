import qs from 'qs'
import PlexAPI from 'plex-api'
import {normalize, schema} from 'normalizr'

import {albumSchema} from './album'
import {trackSchema} from './track'
import parseMediaContainer from './mediaContainer'

export default class Client {
  constructor (config) {
    this.api = new PlexAPI(config)
  }

  root () {
    return this.api.query('/')
  }

  sections () {
    return this.api.query('/library/sections')
  }

  section () {
    return this.api.query('/library/sections/1')
  }

  fetchMedia (uri, start = 0, size = 20) {
    return this.api.query({
      uri,
      extraHeaders: {
        'X-Plex-Container-Start': start.toString(),
        'X-Plex-Container-Size': size.toString(),
      },
    })
    .then((res) => parseMediaContainer(res))
  }

  albums (start, size) {
    const params = qs.stringify({
      type: 9,
      sort: 'addedAt:desc',
    })
    const path = `/library/sections/1/all?${params}`

    const responseSchema = new schema.Object({
      metadata: new schema.Array(albumSchema),
    })

    return this.fetchMedia(path, start, size)
      .then((res) => normalize(res, responseSchema))
  }

  albumTracks (albumId) {
    const path = `/library/metadata/${albumId}/children`

    const responseSchema = new schema.Object({
      metadata: new schema.Array(trackSchema),
    })

    return this.fetchMedia(path)
      .then((res) => normalize(res, responseSchema))
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
    const params = qs.stringify({
      ...options,
      'X-Plex-Token': this.api.authToken,
    })
    return `//${this.api.serverUrl}/photo/:/transcode?${params}`
  }
}
