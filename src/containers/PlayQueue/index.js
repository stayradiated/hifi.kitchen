import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import PlayQueue from '../../components/PlayQueue'

import {selectors as getQueue} from '../../stores/queue'
import {selectQueueItem} from '../../stores/actions'

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
  tracks: getQueue.tracks(state),
  selectedIndex: getQueue.selectedItemOffset(state),
}))(PlayQueueContainer)
