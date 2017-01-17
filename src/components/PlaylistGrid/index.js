import React from 'react'

import PlaylistItem from '../PlaylistItem'
import PlaylistContainer from '../../containers/PlaylistInfo'
import MuggleGrid from '../MuggleGrid'
import withState from '../MuggleGrid/withState'
import withRouter from '../MuggleGrid/withRouter'

export default function PlaylistGrid (props) {
  return (
    <MuggleGrid {...props}>
      {[
        (playlist, handleSelect) => (
          <PlaylistItem playlist={playlist} onSelect={handleSelect} />
        ),
        (playlistId) => (
          <PlaylistContainer playlistId={playlistId} />
        ),
      ]}
    </MuggleGrid>
  )
}

PlaylistGrid.withState = withState(PlaylistGrid)
PlaylistGrid.withRouter = withRouter(PlaylistGrid)
