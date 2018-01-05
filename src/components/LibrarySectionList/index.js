import React from 'react'

import PropTypes from 'prop-types'

import './styles.css'

import LibrarySectionListItem from './Item'

export default function LibrarySectionList (props) {
  const { sections, selectedId, onChange } = props

  return (
    <div className='LibrarySectionList'>
      {sections.map((section, index) => (
        <LibrarySectionListItem
          key={index}
          section={section}
          selected={section.id === selectedId}
          onSelect={() => onChange && onChange(section.id)}
        />
      ))}
    </div>
  )
}

LibrarySectionList.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.number,
  onChange: PropTypes.func
}
