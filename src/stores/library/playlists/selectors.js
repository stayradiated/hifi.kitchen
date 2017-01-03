import {createListSelector} from '@stayradiated/mandarin'

module.exports = {
  ...createListSelector((state) => state.library.playlists),
}
