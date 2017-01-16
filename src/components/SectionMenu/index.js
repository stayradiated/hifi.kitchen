import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './styles.css'

export default function SectionMenu (props, context) {
  const {router} = context
  const {serverId, sectionId} = router.params

  return (
    <ul className='SectionMenu-sections'>
      <li className='SectionMenu-routeItem'>
        <Link
          className='SectionMenu-routeLink'
          to={`/server/${serverId}/sections/${sectionId}/albums`}
        >
          Albums
        </Link>
      </li>

      <li className='SectionMenu-routeItem'>
        <Link
          className='SectionMenu-routeLink'
          to={`/server/${serverId}/sections/${sectionId}/artists`}
        >
          Artists
        </Link>
      </li>

      <li className='SectionMenu-routeItem'>
        <Link
          className='SectionMenu-routeLink'
          to={`/server/${serverId}/sections/${sectionId}/tracks`}
        >
          Tracks
        </Link>
      </li>
    </ul>
  )
}

SectionMenu.contextTypes = {
  router: PropTypes.object.isRequired,
}

