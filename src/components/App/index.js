import React from 'react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withProps from 'recompose/withProps'

import PropTypes from 'prop-types'

import './styles.css'

import ContextMenuContainer from '../../containers/ContextMenu'
import BrowserContainer from '../../containers/Browser'
import ControlsContainer from '../../containers/Controls'
import PlayerContainer from '../../containers/Player'
import AddToPlaylistContainer from '../../containers/AddToPlaylist'

const handleChangeSection = (props) => (section) => {
  const { history, location, section: prevSection } = props
  if (section === prevSection) {
    return null
  }

  const params = new window.URLSearchParams(location.search)
  params.set('section', section)
  history.push({
    pathname: location.pathname,
    search: params.toString()
  })
}

const handleChangeItem = (props) => (itemType, itemId) => {
  const { history, location } = props
  const params = new window.URLSearchParams(location.search)
  params.set('itemType', itemType)
  params.set('itemId', itemId)
  history.push({
    pathname: location.pathname,
    search: params.toString()
  })
}

function App (props) {
  const {
    displayPlayer,
    section, itemType, itemId,
    onChangeSection, onChangeItem
  } = props

  let content = (
    <div className='App-browser'>
      <BrowserContainer
        section={section}
        itemType={itemType}
        itemId={itemId}
        onChangeItem={onChangeItem}
        onChangeSection={onChangeSection}
      />
    </div>
  )

  if (displayPlayer) {
    content = (
      <PlayerContainer />
    )
  }

  return (
    <div className='App'>
      <div className='App-main'>
        {content}
      </div>
      <ControlsContainer onNavigate={onChangeItem} />
      <AddToPlaylistContainer />
      <ContextMenuContainer onNavigate={onChangeItem} />
    </div>
  )
}

App.propTypes = {
  displayPlayer: PropTypes.bool,
  section: PropTypes.string,
  itemType: PropTypes.string,
  itemId: PropTypes.number,
  onChangeSection: PropTypes.func.isRequired,
  onChangeItem: PropTypes.func.isRequired
}

export default compose(
  withHandlers({
    onChangeSection: handleChangeSection,
    onChangeItem: handleChangeItem
  }),
  withProps((props) => {
    const params = new window.URLSearchParams(props.location.search)
    return {
      section: params.get('section'),
      itemType: params.get('itemType'),
      itemId: parseInt(params.get('itemId'), 10)
    }
  })
)(App)
