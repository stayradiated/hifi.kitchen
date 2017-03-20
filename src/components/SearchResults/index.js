import React, {PropTypes} from 'react'
import noop from 'nop'

import './styles.css'

import TypedGridItem from '../TypedGridItem'
import GridList from '../GridList/withAutoSizer'

export default function SearchResults (props) {
  const {hubs, onChange, ...otherProps} = props

  const renderItem = (item) => (
    <TypedGridItem
      item={item}
      onSelect={() => onChange(item)}
    />
  )

  const renderHeader = (hub) => (
    <div className='SearchResults-header'>{hub.title}</div>
  )

  return (
    <GridList
      {...otherProps}
      itemsPerRow={6}
      getItemHeight={(width) => width + 50}
      paddingHorizontal={5}
      renderItem={renderItem}
      renderHeader={renderHeader}
      sections={hubs.filter((hub) => hub.items.length)}
    />
  )
}

SearchResults.propTypes = {
  // query: PropTypes.string,
  hubs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
  })),
  onChange: PropTypes.func,
}

SearchResults.defaultProps = {
  onChange: noop,
}
