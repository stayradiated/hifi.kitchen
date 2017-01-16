import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './styles.css'

export default function ServerMenu (props, context) {
  const {sections} = props
  const {router} = context
  const {serverId} = router.params

  return (
    <div className='ServerMenu'>
      <h2 className='ServerMenu-title'>Plex</h2>

      <ul className='ServerMenu-sections'>
        {sections.map((section, i) => (
          <li key={i} className='ServerMenu-routeItem'>
            <Link
              className='ServerMenu-routeLink'
              to={`/server/${serverId}/sections/${section.key}`}
            >
              {section.title}
            </Link>
          </li>
        ))}

        <li className='ServerMenu-routeItem'>
          <Link
            className='ServerMenu-routeLink'
            to={`/server/${serverId}/playlists`}
          >
            Playlists
          </Link>
        </li>

        <li className='ServerMenu-routeItem'>
          <Link
            className='ServerMenu-routeLink'
            to={`/server/${serverId}/search`}
          >
            Search
          </Link>
        </li>
      </ul>
    </div>
  )
}

ServerMenu.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
}

ServerMenu.contextTypes = {
  router: PropTypes.object.isRequired,
}

