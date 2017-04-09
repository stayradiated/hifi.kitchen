import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'

import Queue from '../../components/Queue'

import {selectAllTracks} from '../../stores/tracks/all'
import {moveQueueItem, playQueueItem} from '../../stores/queue/actions'
import * as selectQueue from '../../stores/queue/selectors'

const handleChange = (props) => (item) => {
  const {dispatch} = props
  return dispatch(playQueueItem(item.id))
}

const handleSort = (props) => ({newIndex, oldIndex}) => {
  const {dispatch} = props
  return dispatch(moveQueueItem({newIndex, oldIndex}))
}

function QueueContainer (props) {
  const {
    items, allTracks, selectedItemId,
    onChange, onSort,
  } = props

  return (
    <Queue
      items={items}
      allTracks={allTracks}
      selectedItemId={selectedItemId}
      onChange={onChange}
      onSort={onSort}
    />
  )
}

QueueContainer.propTypes = {
  allTracks: PropTypes.instanceOf(Map).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedItemId: PropTypes.number,
}

export default compose(
  connect((state) => ({
    allTracks: selectAllTracks.values(state),
    items: selectQueue.items(state),
    selectedItemId: selectQueue.selectedItemId(state),
  })),
  withHandlers({
    onChange: handleChange,
    onSort: handleSort,
  }),
)(QueueContainer)
