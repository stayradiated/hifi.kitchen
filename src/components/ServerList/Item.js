import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './Item.css'

import Icon from '../Icon'

export default function ServerListItem (props) {
  const { selected, server, onSelect } = props
  const { status } = server

  let statusText = ''
  let unavailable = false
  switch (true) {
    case status == null || status.available === false:
      statusText = 'Unavailable'
      unavailable = true
      break
    case status.connection.local:
      statusText = 'Nearby'
      break
    default:
      statusText = 'Available'
      break
  }

  const secure = !unavailable && status.connection.protocol === 'https'

  return (
    <button
      className={classNames('ServerListItem', {
        'ServerListItem-selected': selected,
        'ServerListItem-unavailable': unavailable,
        'ServerListItem-secure': secure
      })}
      onClick={onSelect}
    >
      <div className='ServerListItem-text'>
        <h1 className='ServerListItem-name'>{server.name}</h1>
        <h2 className='ServerListItem-status'>{statusText}</h2>
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
    connection: PropTypes.object
  }).isRequired,
  onSelect: PropTypes.func
}
