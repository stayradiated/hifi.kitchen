import {createMapSelector} from '@stayradiated/mandarin'

module.exports = {
  ...createMapSelector((state) => state.playlists.all),
}
