import React, {PropTypes} from 'react'

import './styles.css'

import Server from './Server'

export default function SwitchServer (props) {
  const {servers, connections, statuses} = props

  return (
    <div className='SwitchServer'>
      <h2>Select Server</h2>
      <ul>
        {servers.map((server, i) => {
          const status = statuses.get(server.id)
          const pending = !status
          const available = !pending && status.available
          const connection = available
            ? connections.get(status.connection)
            : null

          return (
            <Server
              key={i}
              server={server}
              available={available}
              pending={pending}
              connection={connection}
            />
          )
        })}
      </ul>
    </div>
  )
}

SwitchServer.propTypes = {
  servers: PropTypes.arrayOf(PropTypes.object).isRequired,
  connections: PropTypes.instanceOf(Map).isRequired,
  statuses: PropTypes.instanceOf(Map).isRequired,
}
