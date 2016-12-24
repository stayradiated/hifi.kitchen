import parseAlbum, {ALBUM_TYPE} from './album'
import parseTrack, {TRACK_TYPE} from './track'

export default function parseMediaContainer (data) {
  const mediaContainer = {}

  if (data.MediaContainer != null) {
    data = data.MediaContainer
  }

  mediaContainer.size            = data.size
  mediaContainer.totalSize       = data.totalSize
  mediaContainer.allowSync       = data.allowSync
  mediaContainer.art             = data.art
  mediaContainer.identifier      = data.identifier
  mediaContainer.mediaTagPrefix  = data.mediaTagPrefix
  mediaContainer.mediaTagVersion = data.mediaTagVersion
  mediaContainer.mixedParents    = data.mixedParents
  mediaContainer.nocache         = data.nocache
  mediaContainer.offset          = data.offset
  mediaContainer.thumb           = data.thumb
  mediaContainer.title1          = data.title1
  mediaContainer.title2          = data.title2
  mediaContainer.viewGroup       = data.viewGroup
  mediaContainer.viewMode        = data.viewMode

  // mediaContainer.Metadata = data.Metadata
  mediaContainer.metadata = data.Metadata.map((item) => {
    switch (item.type) {
      case ALBUM_TYPE:
        return parseAlbum(item)
      case TRACK_TYPE:
        return parseTrack(item)
      default:
        console.log(JSON.stringify(item, null, 2))
        return item
    }
  })

  return mediaContainer
}
