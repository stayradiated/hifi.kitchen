import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.css'

import PanelHeader from './Header'

export default function Panel (props) {
  const {
    details, children, className,
    onClickSubtitle, onClickMeta, onClose, onRefresh, onEdit
  } = props

  return (
    <div className={classNames(className, 'Panel')}>
      <PanelHeader
        {...details}
        onClickSubtitle={onClickSubtitle}
        onClickMeta={onClickMeta}
        onClose={onClose}
        onRefresh={onRefresh}
        onEdit={onEdit}
      />
      <div className='Panel-content'>
        {children}
      </div>
    </div>
  )
}

Panel.propTypes = {
  children: PropTypes.node,
  details: PropTypes.shape({
    thumb: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    meta: PropTypes.string
  }).isRequired,
  className: PropTypes.string,
  onClickSubtitle: PropTypes.func,
  onClickMeta: PropTypes.func,
  onClose: PropTypes.func,
  onEdit: PropTypes.func
}
