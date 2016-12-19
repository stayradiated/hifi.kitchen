const moment = require('moment')

const Item = require('./Item')
const Media = require('./Media')

class Track extends Item {
  constructor (client, data) {
    super(client, data, Track.TYPE_ID)

    this.addedAt              = data.addedAt
    this.duration             = data.duration
    this.grandparentKey       = data.grandparentKey
    this.grandparentRatingKey = data.grandparentRatingKey
    this.grandparentThumb     = data.grandparentThumb
    this.grandparentTitle     = data.grandparentTitle
    this.index                = data.index
    this.key                  = data.key
    this.lastViewedAt         = data.lastViewedAt
    this.originalTitle        = data.originalTitle
    this.parentIndex          = data.parentIndex
    this.parentKey            = data.parentKey
    this.parentRatingKey      = data.parentRatingKey
    this.parentThumb          = data.parentThumb
    this.parentTitle          = data.parentTitle
    this.ratingCount          = data.ratingCount
    this.ratingKey            = data.ratingKey
    this.summary              = data.summary
    this.thumb                = data.thumb
    this.title                = data.title
    this.type                 = data.type
    this.updatedAt            = data.updatedAt
    this.userRating           = data.userRating
    this.viewCount            = data.viewCount

    this.media = data.Media.map((media) => {
      return new Media(this.client, media)
    })
  }

  formatTime (format = 'm:ss') {
    return moment.utc(this.duration).format(format)
  }
}

Track.TYPE_ID = 'track'

module.exports = Track
