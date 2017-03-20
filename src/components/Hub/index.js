import React, {PropTypes} from 'react'

import './styles.css'

import TypedGrid from '../TypedGrid'

export default function Hub (props) {
  const {hub} = props

  return (
    <div className='Hub'>
      <div className='Hub-title'>{hub.title}</div>
      <div className='Hub-items'>
        <TypedGrid items={hub.items} />
      </div>
    </div>
  )
}

Hub.propTypes = {
  hub: PropTypes.shape({
    title: PropTypes.string,
  }),
}
