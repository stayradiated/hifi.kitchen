import React from 'react'
import PropTypes from 'prop-types'

import TrackTable from '../../TrackTable'
import Filters from '../../Filters'

import './styles.css'

const TracksSection = (props) => {
  const {
    tracks,
    onLoad, onRate, onChange, onFilter
  } = props

  return (
    <div className='TracksSection-container'>
      <Filters onChange={onFilter} />
      <TrackTable
        tracks={tracks}
        onLoad={onLoad}
        onChange={onChange}
        onRate={onRate}
      />
    </div>
  )
}

TracksSection.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLoad: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired
}

export default TracksSection
