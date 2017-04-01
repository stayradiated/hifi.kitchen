import React, {PropTypes} from 'react'

import './styles.css'

function LoginWithPin (props) {
  const {pin} = props

  return (
    <div className='LoginWithPin'>

      <h1 className='LoginWithPin-logo'>HiFi Kitchen</h1>
      <p className='LoginWithPin-tagline'>A Music Player for Plex</p>

      <div className='LoginWithPin-form'>
        <p>Copy this code to your clipboard</p>
        <h2 className='LoginWithPin-pin'>{pin.code}</h2>
        <a
          href='https://plex.tv/link'
          target='_blank'
          rel='noopener noreferrer'
          className='LoginWithPin-button'
        >
          Login With Plex
        </a>
      </div>
    </div>
  )
}

LoginWithPin.propTypes = {
  pin: PropTypes.shape({
    code: PropTypes.string,
  }),
}

export default LoginWithPin
