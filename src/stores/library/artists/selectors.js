import {createValueSelector} from '@stayradiated/mandarin'

module.exports = {
  ...createValueSelector((state) => state.library.artists),
}
