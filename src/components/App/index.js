import React from 'react'
import compose from 'recompose/compose'
import withHandlers from 'recompose/withHandlers'
import withProps from 'recompose/withProps'

import PropTypes from 'prop-types'

import './styles.css'

import BrowserContainer from '../../containers/Browser'
import ControlsContainer from '../../containers/Controls'
import QueueContainer from '../../containers/Queue'

const handleChangeSection = (props) => (section) => {
  const {history, location, section: prevSection} = props
  if (section === prevSection) {
    return null
  }

  const params = new URLSearchParams(location.search)
  params.set('section', section)
  history.push({
    pathname: location.pathname,
    search: params.toString(),
  })
}

const handleChangeItem = (props) => (item) => {
  const {history, location} = props
  const params = new URLSearchParams(location.search)
  params.set('itemType', item._type)
  params.set('itemId', item.id)
  history.push({
    pathname: location.pathname,
    search: params.toString(),
  })
}

function App (props) {
  const {
    displayQueue, section, itemType, itemId, onChangeSection, onChangeItem,
  } = props

  return (
    <div className='App'>
      <div className='App-main'>
        <div className='App-browser'>
          <BrowserContainer
            section={section}
            itemType={itemType}
            itemId={itemId}
            onChangeItem={onChangeItem}
            onChangeSection={onChangeSection}
          />
        </div>
        {displayQueue &&
          <div className='App-queue'>
            <QueueContainer />
          </div>}
      </div>
      <ControlsContainer />
    </div>
  )
}

App.propTypes = {
  displayQueue: PropTypes.bool,
  section: PropTypes.string,
  itemType: PropTypes.string,
  itemId: PropTypes.number,
  onChangeSection: PropTypes.func.isRequired,
  onChangeItem: PropTypes.func.isRequired,
}

export default compose(
  withHandlers({
    onChangeSection: handleChangeSection,
    onChangeItem: handleChangeItem,
  }),
  withProps((props) => {
    const params = new URLSearchParams(props.location.search)
    return {
      section: params.get('section'),
      itemType: params.get('itemType'),
      itemId: parseInt(params.get('itemId'), 10),
    }
  }),
)(App)
