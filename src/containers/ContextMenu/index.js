import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import compose from 'recompose/compose'

import {setTrackToAddToPlaylist} from '../../stores/ui'

import ContextMenu from '../../components/ContextMenu'

const ContextMenuContainer = (props) => {
  const {dispatch} = props

  return (
    <ContextMenu
      onAddTrackToPlaylist={compose(dispatch, setTrackToAddToPlaylist)}
    />
  )
}

ContextMenuContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(ContextMenuContainer)
