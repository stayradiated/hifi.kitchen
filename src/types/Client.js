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

  fetchMedia (uri) {
    return this.api.query({
      uri,
      extraHeaders: {
        'X-Plex-Container-Size': '20',
        'X-Plex-Container-Start': '0',
      },
    })
    .then((res) => new MediaContainer(this, res))
  }

  albums () {
    const params = qs.stringify({
      type: 9,
      sort: 'addedAt:desc',
    })
    return this.fetchMedia(`/library/sections/1/all?${params}`)
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
    const params = qs.stringify(options)
    return `//${this.api.serverUrl}/photo/:/transcode?${params}`
  }
}

module.exports = Client
