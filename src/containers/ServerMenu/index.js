import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import ServerMenu from '../../components/ServerMenu'

import {
  fetchLibrarySections,
} from '../../stores/library/sections/actions'
import * as selectLibrarySections from '../../stores/library/sections/selectors'

class ServerMenuContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    librarySections: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  componentWillMount () {
    const {dispatch} = this.props
    dispatch(fetchLibrarySections())
  }

  render () {
    const {librarySections} = this.props

    return (
      <ServerMenu sections={librarySections} />
    )
  }
}

export default connect((state) => ({
  librarySections: selectLibrarySections.value(state),
}))(ServerMenuContainer)
