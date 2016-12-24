import Plex from './types/Client'
import config from '../config.json'

export default new Plex(config.server)
