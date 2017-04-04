import React, {PropTypes} from 'react'

import QueueItem from './Item'
import SortableItemsList from '../SortableList'

export default function Queue (props) {
  const {className, selectedItemId, items, allTracks, onChange, onSort} = props

  const renderItem = ({key, style, index}) => {
    const item = items[index]
    const track = allTracks.get(item.track)

    if (track == null) {
      return (
        <div key={key} style={style} />
      )
    }

    return (
      <QueueItem
        key={item.id}
        style={style}
        index={index}
        track={track}
        isSelected={selectedItemId === item.track}
        onClick={() => onChange && onChange(item)}
      />
    )
  }

  renderItem.propTypes = {
    key: PropTypes.string,
    style: PropTypes.shape({}),
    index: PropTypes.number,
  }

  return (
    <SortableItemsList
      className={className}
      rowCount={items.length}
      renderItem={renderItem}
      isRowLoaded={({index}) => items[index] != null}
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
  allTracks: PropTypes.instanceOf(Map).isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  onSort: PropTypes.func,
  selectedItemId: PropTypes.number,
}
