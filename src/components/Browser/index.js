import React, {PropTypes} from 'react'
import classNames from 'classnames'
import noop from 'nop'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import setPropTypes from 'recompose/setPropTypes'
import withHandlers from 'recompose/withHandlers'

import './styles.css'

import TypedGrid from '../TypedGrid'
import TypedPanel from '../TypedPanel'
import NavBar, {SEARCH} from '../NavBar'
import SearchResults from '../SearchResults'

const handleChangeItem = (props) => (item) => {
  const {onChangeTrack, onChangeItem} = props
  if (item != null && item._type === 'track') {
    return onChangeTrack(item)
  }
  return onChangeItem(item)
}

function Browser (props) {
  const {
    className, sections, values,
    item, onChangeItem, onLoadItems,
    section, onChangeSection, onRateTrack,
    searchQuery, onChangeSearchQuery,
  } = props

  const items = sections[section]

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
          onChangeSection={onChangeSection}
          onChangeSearchQuery={onChangeSearchQuery}
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
          onSelectTrack={onChangeItem}
          onRateTrack={onRateTrack}
          onClose={() => onChangeItem(null)}
        />}
    </div>
  )
}

Browser.propTypes = {
  className: PropTypes.string,
  sections: PropTypes.objectOf(PropTypes.array),
  values: PropTypes.objectOf(PropTypes.instanceOf(Map)),
  item: PropTypes.shape({}),
  section: PropTypes.string.isRequired,
  searchQuery: PropTypes.string,
  onChangeSection: PropTypes.func,
  onChangeSearchQuery: PropTypes.func,
  onChangeItem: PropTypes.func.isRequired,
  onRateTrack: PropTypes.func.isRequired,
  onLoadItems: PropTypes.func,
}

Browser.defaultProps = {
  sections: {},
  onChangeSection: noop,
  onChangeSearchQuery: noop,
}

export default compose(
  setPropTypes({
    onChangeTrack: PropTypes.func,
    onChangeItem: PropTypes.func,
    onLoadItems: PropTypes.func,
  }),
  defaultProps({
    onChangeTrack: noop,
    onChangeItem: noop,
  }),
  withHandlers({
    onChangeItem: handleChangeItem,
  }),
)(Browser)
