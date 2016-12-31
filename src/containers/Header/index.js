import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import './styles.css'

import {fetchLibrarySections} from '../../stores/library/sections/actions'

import {value as getAllLibrarySections} from '../../stores/library/sections/selectors'

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

        <Link to='/library/1/albums'>Albums</Link>
        <Link to='/library/1/artists'>Artists</Link>
        <Link to='/library/1/playlists'>Playlists</Link>

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
  librarySections: getAllLibrarySections(state),
}))(HeaderContainer)
