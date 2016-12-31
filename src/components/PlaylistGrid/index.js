import React, {PropTypes} from 'react'

import Playlist from '../Playlist'
import PlaylistContainer from '../../containers/PlaylistInfo'
import MagicGrid from '../MagicGrid'

export default function PlaylistGrid (props) {
  const {playlists, playlistId, librarySectionId} = props

  const items = playlists.map((playlist) => ({
    id: playlist.id,
    element: <Playlist playlist={playlist} />,
  }))

  return (
    <MagicGrid
      items={items}
      itemWidth={150}
      component={<PlaylistContainer librarySectionId={librarySectionId} />}
      propName='playlistId'
      currentId={playlistId}
    />
  )
}

PlaylistGrid.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  playlistId: PropTypes.number,
  librarySectionId: PropTypes.number,
}
