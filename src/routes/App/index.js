import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import './styles.css'

import {
  selectPlex,
} from '../../stores/plex/instance'

import Loading from '../../containers/Loading'

class AppRoute extends Component {
  static propTypes = {
    children: PropTypes.node,
    library: PropTypes.shape({}),
    ready: PropTypes.bool,
  }

  static childContextTypes = {
    library: PropTypes.shape({}),
  }

  getChildContext () {
    const {library} = this.props
    return {library}
  }

  render () {
    const {ready, children} = this.props

    return (
      <div className='AppRoute'>
        <div className='AppRoute-contents'>
          {ready ? children : <Loading />}
        </div>
      </div>
    )
  }
}

export default connect((state) => ({
  library: selectPlex.library(state),
  ready: selectPlex.ready(state),
}))(AppRoute)
