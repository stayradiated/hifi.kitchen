const qs = require('qs')
const PlexAPI = require('plex-api')

const MediaContainer = require('./MediaContainer')

class Client {
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
    .then((res) => new MediaContainer(this, res))
  }

  albums (start, size) {
    const params = qs.stringify({
      type: 9,
      sort: 'addedAt:desc',
    })
    return this.fetchMedia(`/library/sections/1/all?${params}`, start, size)
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

module.exports = Client
