import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import compose from 'recompose/compose'

import {
  setTrackToAddToPlaylist,
  removeItemFromPlaylist
} from '@stayradiated/hifi-redux'

import ContextMenu from '../../components/ContextMenu'

const ContextMenuContainer = (props) => {
  const { onNavigate, dispatch } = props

  return (
    <ContextMenu
      onAddTrackToPlaylist={compose(dispatch, setTrackToAddToPlaylist)}
      onRemoveItemFromPlaylist={compose(dispatch, removeItemFromPlaylist)}
      onNavigate={onNavigate}
    />
  )
}

ContextMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired
}

export default connect()(ContextMenuContainer)
