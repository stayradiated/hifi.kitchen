import React, {PropTypes} from 'react'

import QueueItem from './Item'
import SortableItemsList from '../SortableList'

export default function Queue (props) {
  const {className, selectedIndex, tracks, onChange, onSort} = props

  const renderItem = ({key, style, index}) => (
    <QueueItem
      key={key}
      style={style}
      index={index}
      track={tracks[index]}
      isSelected={selectedIndex === index}
      onClick={() => onChange && onChange(tracks[index], index)}
    />
  )

  renderItem.propTypes = {
    key: PropTypes.string,
    style: PropTypes.shape({}),
    index: PropTypes.number,
  }

  return (
    <SortableItemsList
      className={className}
      rowCount={tracks.length}
      renderItem={renderItem}
      isRowLoaded={({index}) => tracks[index] != null}
      itemHeight={60}
      rowHeight={60}
      onSortEnd={onSort}
      useDragHandle
      lockAxis='y'
      helperClass='QueueItem-helper'
    />
  )
}

Queue.propTypes = {
  className: PropTypes.string,
  tracks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func,
  onSort: PropTypes.func,
}
