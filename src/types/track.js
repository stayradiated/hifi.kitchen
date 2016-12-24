import {schema} from 'normalizr'

import parseMedia from './media'

export const TRACK_TYPE = 'track'
export const trackSchema = new schema.Entity('tracks')

export default function parseTrack (data) {
  const track = {}

  if (data.type !== TRACK_TYPE) {
    throw new Error(`Expected type "${TRACK_TYPE}", but got type "${data.type}"`)
  }

  track.addedAt              = data.addedAt
  track.duration             = data.duration
  track.grandparentKey       = data.grandparentKey
  track.grandparentRatingKey = data.grandparentRatingKey
  track.grandparentThumb     = data.grandparentThumb
  track.grandparentTitle     = data.grandparentTitle
  track.index                = data.index
  track.key                  = data.key
  track.lastViewedAt         = data.lastViewedAt
  track.originalTitle        = data.originalTitle
  track.parentIndex          = data.parentIndex
  track.parentKey            = data.parentKey
  track.parentRatingKey      = data.parentRatingKey
  track.parentThumb          = data.parentThumb
  track.parentTitle          = data.parentTitle
  track.ratingCount          = data.ratingCount
  track.ratingKey            = data.ratingKey
  track.summary              = data.summary
  track.thumb                = data.thumb
  track.title                = data.title
  track.type                 = data.type
  track.updatedAt            = data.updatedAt
  track.userRating           = data.userRating
  track.viewCount            = data.viewCount

  track.id = parseInt(track.ratingKey, 10)

  track.media = data.Media.map((media) => {
    return parseMedia(media)
  })

  return track
}
