import React from 'react'
import {AutoSizer} from 'react-virtualized'

export default function withAutoSizer (Component) {
  return (props) => (
    <AutoSizer>
      {({height, width}) => (
        <Component
          {...props}
          width={width}
          height={height}
        />
      )}
    </AutoSizer>
  )
}
