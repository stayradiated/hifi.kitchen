import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {Link} from 'react-router'

export default function Server (props) {
  const {server, available, pending, connection} = props

  let statusMessage = ''
  if (pending) {
    statusMessage = 'pending'
  } else if (!available) {
    statusMessage = 'unavailable'
  } else {
    statusMessage = 'available'
    if (connection.local) {
      statusMessage += ' [local]'
    }
    if (connection.protocol === 'https') {
      statusMessage += ' [secure]'
    }
  }

  const classes = classNames('SwitchServer-server', {
    'SwitchServer-serverPending': pending,
    'SwitchServer-serverAvailable': available,
    'SwitchServer-serverUnavailable': !pending && !available,
  })

  return (
    <li className={classes}>
      <Link to={`/server/${server.id}`}>
        {server.name} - {statusMessage}
      </Link>
    </li>
  )
}

Server.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  available: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  connection: PropTypes.shape({
    local: PropTypes.bool,
    protocol: PropTypes.string,
  }),
}
