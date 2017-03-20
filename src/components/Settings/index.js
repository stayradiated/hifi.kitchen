import React, {PropTypes} from 'react'

import './styles.css'

import ServerList from '../ServerList'
import LibrarySectionList from '../LibrarySectionList'

export default function Settings (props) {
  const {
    servers, selectedServerId, onSelectServer, onDone,
    librarySections, selectedLibrarySectionId, onSelectLibrarySection,
  } = props

  return (
    <div className='Settings'>
      <div className='Settings-contents'>
        <h1>Settings</h1>

        <h2 className='Settings-sectionHeader'>Server</h2>
        <ServerList
          servers={servers}
          selectedId={selectedServerId}
          onChange={onSelectServer}
        />

        <h2 className='Settings-sectionHeader'>Library Section</h2>
        <LibrarySectionList
          sections={librarySections}
          selectedId={selectedLibrarySectionId}
          onChange={onSelectLibrarySection}
        />

        {selectedLibrarySectionId != null &&
          <button
            onClick={onDone}
            className='Settings-doneButton'
          >
            Done
          </button>}
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
  onDone: PropTypes.func,
}
