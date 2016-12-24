export default function parsePart (data) {
  const part = {}

  part.id           = data.id
  part.key          = data.key
  part.duration     = data.duration
  part.file         = data.file
  part.size         = data.size
  part.container    = data.container
  part.hasThumbnail = data.hasThumbnail

  return part
}
