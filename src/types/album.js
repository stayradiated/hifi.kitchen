import {schema} from 'normalizr'

export const ALBUM_TYPE = 'album'

export const albumSchema = new schema.Entity('albums')

export default function parseAlbum (data) {
  const album  = {}

  if (data.type !== ALBUM_TYPE) {
    throw new Error(`Expected type "${ALBUM_TYPE}", but got type "${data.type}"`)
  }

  album.allowSync             = data.allowSync
  album.librarySectionID      = data.librarySectionID
  album.librarySectionTitle   = data.librarySectionTitle
  album.librarySectionUUID    = data.librarySectionUUID
  album.ratingKey             = data.ratingKey
  album.key                   = data.key
  album.parentRatingKey       = data.parentRatingKey
  album.studio                = data.studio
  album.type                  = data.type
  album.title                 = data.title
  album.parentKey             = data.parentKey
  album.parentTitle           = data.parentTitle
  album.summary               = data.summary
  album.index                 = data.index
  album.viewCount             = data.viewCount
  album.lastViewedAt          = data.lastViewedAt
  album.year                  = data.year
  album.thumb                 = data.thumb
  album.parentThumb           = data.parentThumb
  album.originallyAvailableAt = data.originallyAvailableAt
  album.leafCount             = data.leafCount
  album.addedAt               = data.addedAt
  album.updatedAt             = data.updatedAt

  album.id = parseInt(album.ratingKey, 10)

  album.genre = (data.Genre || [])
    .map((genre) => genre.tag)
    .join(', ')

  return album
}
