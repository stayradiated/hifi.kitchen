import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import Player from '../../components/Player'

import {selectAllTracks} from '../../stores/tracks/all'
import {moveQueueItem, playQueueItem} from '../../stores/queue/actions'
import * as selectPlayer from '../../stores/queue/selectors'

const handleChange = (props) => (item) => {
  const {dispatch} = props
  return dispatch(playQueueItem(item.id))
}

const handleSort = (props) => ({newIndex, oldIndex}) => {
  const {dispatch} = props
  return dispatch(moveQueueItem({newIndex, oldIndex}))
}

function PlayerContainer (props) {
  const {
    items, values, selectedTrackId,
    onChange, onSort,
  } = props

  return (
    <Player
      items={items}
      values={values}
      selectedTrackId={selectedTrackId}
      onChange={onChange}
      onSort={onSort}
    />
  )
}

PlayerContainer.propTypes = {
  values: PropTypes.shape({
    tracks: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedTrackId: PropTypes.number,
}

export default compose(
  connect((state) => ({
    values: {
      tracks: selectAllTracks.values(state),
    },
    items: selectPlayer.items(state),
    selectedTrackId: selectPlayer.trackId(state),
  })),
  withHandlers({
    onChange: handleChange,
    onSort: handleSort,
  }),
)(PlayerContainer)
