import {PropTypes} from 'react'

import compose from 'recompose/compose'
import getContext from 'recompose/getContext'
import withHandlers from 'recompose/withHandlers'

const withRouter = compose(
  getContext({
    router: PropTypes.shape({}).isRequired,
  }),
  withHandlers({
    onChange: ({itemPath, router}) => (id) => {
      const path = itemPath(id, router.params)
      router.push(path)
    },
  })
)

export default withRouter
