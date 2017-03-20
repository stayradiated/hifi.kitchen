import {SortableContainer} from 'react-sortable-hoc'
import toClass from 'recompose/toClass'

import ItemsList from '../List'
import withAutoSizer from '../hoc/withAutoSizer'

export default withAutoSizer(new SortableContainer(toClass(ItemsList), {withRef: true}))
