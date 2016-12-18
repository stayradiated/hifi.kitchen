class Photo {
  constructor (client, src) {
    this.client = client
    this.src = src
  }

  transcode (width = 150, height = 150, minSize = 1) {
    return this.client.transcode({
      url: this.src,
      width,
      height,
      minSize,
    })
  }
}

module.exports = Photo
