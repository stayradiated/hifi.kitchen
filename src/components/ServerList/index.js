import React, {PropTypes} from 'react'

import './styles.css'

import ServerListItem from './Item'

export default function ServerList (props) {
  const {selectedId, servers, onChange} = props

  return (
    <div className='ServerList'>
      {servers.map((server, index) => (
        <ServerListItem
          key={index}
          server={server}
          selected={server.id === selectedId}
          onSelect={() => onChange && onChange(server.id)}
        />
      ))}
    </div>
  )
}

ServerList.propTypes = {
  servers: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedId: PropTypes.string,
  onChange: PropTypes.func,
}
