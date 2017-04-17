import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import noop from 'nop'
import {Link} from 'react-router-dom'

import './styles.css'

import Icon from '../Icon'
import SearchBar from '../SearchBar'
import Dropdown from '../Dropdown'

export const SEARCH = 'SEARCH'

export default function NavBar (props) {
  const {
    sections, currentSection, searchQuery, sortBy, sortDesc, sortOptions,
    onChangeSection, onChangeSearchQuery, onChangeSortBy,
  } = props

  const searchBar = (
    <SearchBar
      key={SEARCH}
      className={classNames({
        'NavBar-section-item': true,
        'NavBar-section-item-selected': currentSection === SEARCH,
      })}
      query={searchQuery}
      onClick={() => onChangeSection(SEARCH)}
      onChange={onChangeSearchQuery}
    />
  )

  return (
    <header className='NavBar'>
      <nav className='NavBar-section-list'>
        {Object.keys(sections).map((section) => {
          if (section === SEARCH) {
            return searchBar
          }
          return (
            <button
              key={section}
              className={classNames({
                'NavBar-section-item': true,
                'NavBar-section-item-selected': section === currentSection,
              })}
              onMouseDown={() => onChangeSection(section)}
            >
              {sections[section]}
            </button>
          )
        })}
      </nav>
      <nav className='NavBar-section-list'>
        {sortOptions.length > 0 && <Dropdown
          active={sortBy}
          descending={sortDesc}
          items={sortOptions}
          onChange={onChangeSortBy}
        />}

        <Link to='/settings' className='NavBar-section-item'>
          <Icon icon='cog' />
        </Link>
      </nav>
    </header>
  )
}

NavBar.propTypes = {
  sections: PropTypes.objectOf(PropTypes.string).isRequired,
  currentSection: PropTypes.string,
  searchQuery: PropTypes.string,
  sortBy: PropTypes.string,
  sortDesc: PropTypes.bool,
  sortOptions: PropTypes.arrayOf(PropTypes.string),
  onChangeSection: PropTypes.func,
  onChangeSearchQuery: PropTypes.func,
  onChangeSortBy: PropTypes.func,
}

NavBar.defaultProps = {
  onChangeSection: noop,
  onChangeSearchQuery: noop,
}
