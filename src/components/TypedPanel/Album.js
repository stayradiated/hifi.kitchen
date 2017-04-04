import React, {PropTypes} from 'react'

import Panel from '../Panel'
import TrackList from '../TrackList'

export default function AlbumPanel (props) {
  const {
    album, values, currentlyPlayingTrackId, playerState,
    onSelectTrack, onRateTrack, onLoadItems,
    ...otherProps
  } = props

  const details = {
    thumb: album.thumb,
    title: album.title,
    subtitle: album.parentTitle,
    meta: album.year != null ? album.year.toString() : '',
  }

  const albumTracks = values.albumTracks.get(album.id) || []

  const handleClickSubtitle = () => {
    const artist = values.artists.get(album.parentId)
    console.log({album, artist, values})
    onSelectTrack(artist)
  }

  return (
    <Panel
      {...otherProps}
      details={details}
      onClickSubtitle={handleClickSubtitle}
    >
      <TrackList
        currentlyPlayingTrackId={currentlyPlayingTrackId}
        onLoadItems={onLoadItems}
        onRateTrack={onRateTrack}
        onSelectTrack={onSelectTrack}
        playerState={playerState}
        preserveTrackIndex
        trackIds={albumTracks}
        values={values}
      />
    </Panel>
  )
}

AlbumPanel.propTypes = {
  album: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    parentTitle: PropTypes.string,
    pear: PropTypes.number,
    tracks: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  currentlyPlayingTrackId: PropTypes.number,
  onLoadItems: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,
  onSelectTrack: PropTypes.func.isRequired,
  playerState: PropTypes.string,
  values: PropTypes.shape({
    albumTracks: PropTypes.instanceOf(Map),
    tracks: PropTypes.instanceOf(Map),
  }).isRequired,
}
