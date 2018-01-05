import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import './styles.css'

import SquareImage from '../SquareImage'

export default function GridItem (props) {
  const { onSelect, image, title, subtitle, highlight, ...otherProps } = props

  return (
    <button
      {...otherProps}
      className='GridItem'
      onClick={onSelect}
    >
      <SquareImage
        className='GridItem-thumb'
        imageClassName={classNames('GridItem-thumbImage', {
          'GridItem-thumbImage-highlight': highlight
        })}
        src={image}
        alt={title}
        size={300}
        quality={50}
      />
      <div className='GridItem-text'>
        <h2 className='GridItem-title'>{title}</h2>
        <h3 className='GridItem-subtitle'>{subtitle}</h3>
      </div>
    </button>
  )
}

GridItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  highlight: PropTypes.boolean,
  onSelect: PropTypes.func
}
