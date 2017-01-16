import React, {PropTypes} from 'react'

import './styles.css'

import SectionMenu from '../../components/SectionMenu'

export default function SectionRoute (props) {
  const {children} = props

  return (
    <div className='SectionRoute'>
      <SectionMenu />
      {children}
    </div>
  )
}

SectionRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
