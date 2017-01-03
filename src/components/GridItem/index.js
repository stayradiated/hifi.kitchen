import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import './styles.css'

import SquareImage from '../SquareImage'

export default function GridItem (props) {
  const {link, image, title, subtitle, ...otherProps} = props

  return (
    <Link {...otherProps} to={link} className='GridItem'>
      <SquareImage
        className='GridItem-image'
        src={image}
        alt={title}
        size={140}
      />
      <div className='GridItem-text'>
        <h2 className='GridItem-title'>{title}</h2>
        <h3 className='GridItem-subtitle'>{subtitle}</h3>
      </div>
    </Link>
  )
}

GridItem.propTypes = {
  link: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
