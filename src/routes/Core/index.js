import React, {PropTypes} from 'react'

import './styles.css'

import SwitchServerContainer from '../../containers/SwitchServer'
import ControlsContainer from '../../containers/Controls'
// import HeaderContainer from '../../containers/Header'

export default function CoreRoute (props) {
  const {children} = props

  return (
    <div className='CoreRoute'>
      <SwitchServerContainer />
      {/* <HeaderContainer /> */}
      <div className='CoreRoute-contents'>
        {children}
      </div>
      <ControlsContainer />
    </div>
  )
}

CoreRoute.propTypes = {
  children: PropTypes.node,
}

