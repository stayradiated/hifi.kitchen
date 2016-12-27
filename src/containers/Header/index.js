import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import './styles.css'

import {
  selectors as getLibrarySections,
} from '../../stores/librarySections'

import {fetchLibrarySections} from '../../stores/actions'

class HeaderContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  componentWillMount () {
    const {dispatch} = this.props
    dispatch(fetchLibrarySections())
  }

  render () {
    const {librarySections} = this.props

    return (
      <div className='Header'>
        <h2 className='Header-title'>Plex</h2>
        <ul className='Header-sections'>
          {librarySections.map((section, i) => (
            <li key={i} className='Header-sectionItem'>
              <Link
                className='Header-sectionLink'
                to={`/library/${section.key}`}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default connect((state) => ({
  librarySections: getLibrarySections.value(state),
}))(HeaderContainer)
