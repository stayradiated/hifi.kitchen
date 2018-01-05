import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Item.css'

import Icon from '../Icon'

const SECTION_ICON = {
  movie: 'video',
  artist: 'music',
  photo: 'picture',
  show: 'monitor'
}

export default function LibrarySectionListItem (props) {
  const { section, selected, onSelect } = props

  const icon = SECTION_ICON[section.type]

  return (
    <button
      className={classNames('LibrarySectionListItem', {
        'LibrarySectionListItem-selected': selected
      })}
      onClick={onSelect}
    >
      <h1 className='LibrarySectionListItem-title'>{section.title}</h1>
      <Icon icon='ok' className='LibrarySectionListItem-icon-ok LibrarySectionListItem-icon' />
      <Icon icon={icon} className='LibrarySectionListItem-icon-type LibrarySectionListItem-icon' />
    </button>
  )
}

LibrarySectionListItem.propTypes = {
  selected: PropTypes.bool,
  section: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  onSelect: PropTypes.func
}
