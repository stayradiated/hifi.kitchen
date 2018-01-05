import React from 'react'

function TrackListItemLoading (props) {
  const { index, key, style } = props

  return (
    <button className='TrackListItem' key={key} style={style}>
      <div className='TrackListItem-contents'>
        <span className='TrackListItem-index'>
          {index}
        </span>
        <span className='TrackListItem-fulltitle'>
          <span className='TrackListItem-artist'>Loading...</span>
        </span>
      </div>
    </button>
  )
}

export default TrackListItemLoading
