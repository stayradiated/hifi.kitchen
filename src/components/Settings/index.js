import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './styles.css'

import Icon from '../Icon'
import ServerList from '../ServerList'
import LibrarySectionList from '../LibrarySectionList'

export default function Settings (props) {
  const {
    servers, selectedServerId, onSelectServer,
    librarySections, selectedLibrarySectionId, onSelectLibrarySection,
    onLogOut
  } = props

  return (
    <div className='Settings'>
      <div className='Settings-contents'>
        <h1>Plex Settings</h1>

        {servers.length > 0 &&
          <h2 className='Settings-sectionHeader'>
            1. Select a Server
          </h2>}

        <ServerList
          servers={servers}
          selectedId={selectedServerId}
          onChange={onSelectServer}
        />

        {librarySections.length > 0 &&
          <h2 className='Settings-sectionHeader'>
            2. Select your Music Library
          </h2>}

        <LibrarySectionList
          sections={librarySections}
          selectedId={selectedLibrarySectionId}
          onChange={onSelectLibrarySection}
        />

        {selectedLibrarySectionId != null &&
          <Link to='/library' className='Settings-doneButton'>
            Done
          </Link>}

        <footer>
          <button onClick={onLogOut} className='Settings-logoutButton'>
            <Icon icon='logout' /> Log Out
          </button>
        </footer>
      </div>
    </div>
  )
}

Settings.propTypes = {
  servers: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedServerId: PropTypes.string,
  onSelectServer: PropTypes.func,
  librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedLibrarySectionId: PropTypes.number,
  onSelectLibrarySection: PropTypes.func,
  onLogOut: PropTypes.func
}
