import React, {PropTypes} from 'react'
import classNames from 'classnames'

import './Item.css'

import Icon from '../Icon'

export default function ServerListItem (props) {
  const {selected, server, onSelect} = props
  const {connection} = server

  let status = ''
  switch (true) {
    case connection == null:
      status = 'Unavailable'
      break
    case connection.local:
      status = 'Nearby'
      break
    default:
      status = 'Available'
      break
  }

  return (
    <button
      className={classNames('ServerListItem', {
        'ServerListItem-selected': selected,
        'ServerListItem-unavailable': connection == null,
        'ServerListItem-secure': connection && connection.protocol === 'https',
      })}
      onClick={onSelect}
    >
      <div className='ServerListItem-text'>
        <h1 className='ServerListItem-name'>{server.name}</h1>
        <h2 className='ServerListItem-status'>{status}</h2>
      </div>
      <Icon icon='check' className='ServerListItem-icon-ok ServerListItem-icon' />
      <Icon icon='lock' className='ServerListItem-icon-lock ServerListItem-icon' />
      <Icon icon='attention' className='ServerListItem-icon-warning ServerListItem-icon' />
    </button>
  )
}

ServerListItem.propTypes = {
  selected: PropTypes.bool,
  server: PropTypes.shape({
    name: PropTypes.string,
    connection: PropTypes.object,
  }).isRequired,
  onSelect: PropTypes.func,
}
