import React from 'react'

import PropTypes from 'prop-types'

import './Header.css'

import BlurImage from '../BlurImage'
import Icon from '../Icon'
import SquareImage from '../SquareImage'

export default function PanelHeader (props) {
  const {
    thumb, title, subtitle, meta,
    onClickSubtitle, onClickMeta, onClose, onRefresh
  } = props

  return (
    <div className='PanelHeader'>
      <BlurImage src={thumb} />
      <SquareImage
        className='PanelHeader-thumb'
        imageClassName='PanelHeader-thumbImage'
        src={thumb}
        alt={title}
        size={150}
        quality={90}
      />
      <div className='PanelHeader-text'>
        <div className='PanelHeader-title'>{title}</div>
        <button
          className='PanelHeader-subtitle'
          onClick={onClickSubtitle}
        >
          {subtitle}
        </button>
        <button
          className='PanelHeader-meta'
          onClick={onClickMeta}
        >
          {meta}
        </button>
      </div>
      {onClose && (
        <Icon
          icon='cancel'
          className='PanelHeader-close'
          onClick={onClose}
        />
      )}
      {onRefresh && (
        <Icon
          icon='cw'
          className='PanelHeader-refresh'
          onClick={onRefresh}
        />
      )}
    </div>
  )
}

PanelHeader.propTypes = {
  thumb: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  meta: PropTypes.string,
  onClickSubtitle: PropTypes.func,
  onClickMeta: PropTypes.func,
  onClose: PropTypes.func,
  onRefresh: PropTypes.func
}
