import React from 'react'
import PropTypes from 'prop-types'

import PlayerItem from './Item'
import SortableItemsList from '../SortableList'

export default function PlayerList (props) {
  const {className, selectedTrackId, items, values, onChange, onSort, onRateTrack} = props

  const renderItem = ({key, style, index}) => {
    const item = items[index]
    const track = values.tracks.get(item.track)

    if (track == null) {
      return (
        <div key={key} style={style} />
      )
    }

    return (
      <PlayerItem
        key={item.id || key}
        style={style}
        index={index}
        track={track}
        isSelected={selectedTrackId === item.track}
        onClick={() => onChange && onChange(item)}
        onRate={onRateTrack}
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
      helperClass='PlayerItem-helper SortHandle-helper'
      style={{
        paddingTop: '50px',
      }}
    />
  )
}

PlayerList.propTypes = {
  values: PropTypes.shape({
    tracks: PropTypes.instanceOf(Map).isRequired,
  }).isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  onSort: PropTypes.func,
  onRateTrack: PropTypes.func,
  selectedTrackId: PropTypes.number,
}
