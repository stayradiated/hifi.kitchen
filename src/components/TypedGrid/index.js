import React from 'react'
import PropTypes from 'prop-types'
import noop from 'nop'

import TypedGridItem from '../TypedGridItem'
import Grid from '../Grid/withAutoSizer'
import withState from '../Grid/withState'
import withRouter from '../Grid/withRouter'

export default function TypedGrid (props) {
  const { onChange, ...otherProps } = props

  return (
    <Grid
      {...otherProps}
      itemsPerRow={6}
      getItemHeight={(width) => width + 50}
      paddingHorizontal={5}
    >
      {(item) => (
        <TypedGridItem
          item={item}
          onSelect={onChange}
        />
      )}
    </Grid>
  )
}

TypedGrid.propTypes = {
  onChange: PropTypes.func
}

TypedGrid.defaultProps = {
  onChange: noop
}

TypedGrid.withState = withState(TypedGrid)
TypedGrid.withRouter = withRouter(TypedGrid)
