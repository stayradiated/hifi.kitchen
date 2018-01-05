import React from 'react'

import PropTypes from 'prop-types'

import './Header.css'

import BlurImage from '../BlurImage'

export default function AlbumListHeader (props) {
  const { album, style } = props

  return (
    <div style={style} className='AlbumListHeader'>
      <BlurImage src={album.thumb} />
      <div className='AlbumListHeader-title'>{album.title}</div>
    </div>
  )
}

AlbumListHeader.propTypes = {
  album: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  style: PropTypes.shape({})
}
