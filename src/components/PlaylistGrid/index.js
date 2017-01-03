import React, {PropTypes} from 'react'

import PlaylistItem from '../PlaylistItem'
import PlaylistContainer from '../../containers/PlaylistInfo'
import MuggleGrid from '../MuggleGrid'

export default function PlaylistGrid (props) {
  const {playlists, playlistId, ...otherProps} = props

  return (
    <MuggleGrid
      {...otherProps}
      items={playlists}
      currentId={playlistId}
      getElement={(playlist) => <PlaylistItem playlist={playlist} />}
      component={<PlaylistContainer />}
      propName='playlistId'
    />
  )
}

PlaylistGrid.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.object).isRequired,
  playlistId: PropTypes.number,
}
