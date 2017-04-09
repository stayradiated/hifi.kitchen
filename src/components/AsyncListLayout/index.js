import PropTypes from 'prop-types'

export default function AsyncListLayout (props) {
  const {children, layout, onLoad} = props

  const rowCount = layout.reduce((acc, item) => acc + item.size, 0)

  const renderItem = (itemProps) => {
    const {index} = itemProps
    let chunk = 0
    for (let i = 0; i < layout.length; i += 1) {
      const nextChunk = chunk + layout[i].size
      if (index >= chunk && index < nextChunk) {
        const valueIndex = index - chunk
        const value = layout[i].items[valueIndex]
        return layout[i].render(value, valueIndex)(itemProps)
      }
      chunk = nextChunk
    }
    console.error('Could not render item!', {props, layout})
    return false
  }

  const isRowLoaded = ({index}) => {
    let chunk = 0
    for (let i = 0; i < layout.length; i += 1) {
      const nextChunk = chunk + layout[i].size
      if (index >= chunk && index < nextChunk) {
        const valueIndex = index - chunk
        return layout[i].items[valueIndex] != null
      }
      chunk = nextChunk
    }
    console.error('Could not detect if row is loaded!', {index, layout})
    return false
  }

  return children({
    rowCount,
    renderItem,
    isRowLoaded,
    onLoad,
  })
}

AsyncListLayout.propTypes = {
  children: PropTypes.func,
  layout: PropTypes.arrayOf(PropTypes.shape({
    size: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.any).isRequired,
    render: PropTypes.func.isRequired,
  })).isRequired,
  onLoad: PropTypes.func.isRequired,
}
