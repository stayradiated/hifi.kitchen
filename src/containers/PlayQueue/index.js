import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import PlayQueue from '../../components/PlayQueue'

import {selectQueueItem} from '../../stores/queue/actions'

import * as selectQueue from '../../stores/queue/selectors'

class PlayQueueContainer extends Component {
  static propTypes = {
    tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectedIndex: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.handleSelectTrack = this.handleSelectTrack.bind(this)
  }

  handleSelectTrack (track, i) {
    const {dispatch} = this.props
    dispatch(selectQueueItem(i))
  }

  render () {
    const {selectedIndex, tracks} = this.props

    if (tracks.length === 0) {
      return null
    }

    return (
      <PlayQueue
        tracks={tracks}
        selectedIndex={selectedIndex}
        onSelectTrack={this.handleSelectTrack}
      />
    )
  }
}

export default connect((state) => ({
  tracks: selectQueue.tracks(state),
  selectedIndex: selectQueue.selectedItemOffset(state),
}))(PlayQueueContainer)
