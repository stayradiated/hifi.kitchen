import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withHandlers from 'recompose/withHandlers'
import noop from 'nop'

import './styles.css'

import {TRACK} from '../../stores/constants'

import TypedGrid from '../TypedGrid'
import TypedPanel from '../TypedPanel'
import NavBar, {SEARCH} from '../NavBar'
import SearchResults from '../SearchResults'

const handleChangeItem = (props) => (itemType, itemId) => {
  const {onChangeItem, onCreateQueue} = props
  if (itemType === TRACK) {
    return onCreateQueue(itemType, itemId)
  }
  return onChangeItem(itemType, itemId)
}

function Browser (props) {
  const {
    className, sections, values,
    currentlyPlayingTrackId, playerState,
    item, onChangeItem, onLoadItems, onLoadItemChildren,
    sortBy, sortDesc, sortOptions,
    section, onChangeSection, onRateTrack, onChangeSortBy,
    searchQuery, onChangeSearchQuery, onCreateQueue,
  } = props

  const items = sections[section] || []

  let contents
  switch (section) {
    case SEARCH:
      contents = (
        <SearchResults
          query={searchQuery}
          hubs={items}
          onChange={onChangeItem}
        />
      )
      break
    default:
      contents = (
        <TypedGrid
          size={150}
          items={items}
          onChange={onChangeItem}
          onLoad={(start, end) => onLoadItems(section, start, end)}
        />
      )
  }

  return (
    <div className={classNames(className, 'Browser')}>
      <div className='Browser-grid'>
        <NavBar
          sections={Object.keys(sections)}
          currentSection={section}
          searchQuery={searchQuery}
          sortBy={sortBy}
          sortDesc={sortDesc}
          sortOptions={sortOptions}
          onChangeSection={onChangeSection}
          onChangeSearchQuery={onChangeSearchQuery}
          onChangeSortBy={onChangeSortBy}
        />
        <div className='Browser-grid-wrapper'>
          {contents}
        </div>
      </div>
      {item &&
        <TypedPanel
          className='Browser-selected-panel'
          item={item}
          values={values}
          playerState={playerState}
          currentlyPlayingTrackId={currentlyPlayingTrackId}
          onClose={() => onChangeItem(null)}
          onRateTrack={onRateTrack}
          onNavigate={onChangeItem}
          onCreateQueue={onCreateQueue}
          onLoadItems={(start, end) => onLoadItemChildren(item, start, end)}
        />}
    </div>
  )
}

Browser.propTypes = {
  className: PropTypes.string,
  sections: PropTypes.objectOf(PropTypes.array),
  values: PropTypes.objectOf(PropTypes.instanceOf(Map)),
  item: PropTypes.shape({}),
  section: PropTypes.string,
  currentlyPlayingTrackId: PropTypes.number,
  searchQuery: PropTypes.string,
  playerState: PropTypes.string,
  sortBy: PropTypes.string,
  sortDesc: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(PropTypes.string),
  onChangeItem: PropTypes.func.isRequired,
  onChangeSearchQuery: PropTypes.func,
  onChangeSection: PropTypes.func,
  onChangeSortBy: PropTypes.func,
  onCreateQueue: PropTypes.func,
  onLoadItemChildren: PropTypes.func,
  onLoadItems: PropTypes.func,
  onRateTrack: PropTypes.func.isRequired,
}

Browser.defaultProps = {
  onChangeItem: noop,
  onChangeSearchQuery: noop,
  onChangeSection: noop,
  sections: {},
}

export {
  SEARCH,
}

export default withHandlers({
  onChangeItem: handleChangeItem,
})(Browser)
