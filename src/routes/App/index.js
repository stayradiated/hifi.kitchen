import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import './styles.css'

import {initializePlex} from '../../stores/plex'

class AppRoute extends Component {
  static propTypes = {
    children: PropTypes.node,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const {dispatch} = this.props
    dispatch(initializePlex())
  }

  render () {
    const {children} = this.props

    return (
      <div className='AppRoute'>
        <div className='AppRoute-contents'>
          {children}
        </div>
      </div>
    )
  }
}

export default connect()(AppRoute)
