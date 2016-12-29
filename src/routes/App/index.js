import React, {PropTypes} from 'react'

import './styles.css'

import ControlsContainer from '../../containers/Controls'
import HeaderContainer from '../../containers/Header'

export default function AppRoute (props) {
  const {children} = props

  return (
    <div className='AppRoute'>
      <HeaderContainer />
      <div className='AppRoute-contents'>
        {children}
      </div>
      <ControlsContainer />
    </div>
  )
}

AppRoute.propTypes = {
  children: PropTypes.node,
}
