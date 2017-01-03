import React, {Component, PropTypes} from 'react'
import {AutoSizer, InfiniteLoader, List} from 'react-virtualized'
import {connect} from 'react-redux'

import 'react-virtualized/styles.css'

import AlbumItem from '../../components/AlbumItem'

import {fetchLibraryAlbumsRange} from '../../stores/library/albums/actions'

import {values as getAllAlbums} from '../../stores/albums/all/selectors'
import * as selectLibraryAlbums from '../../stores/library/albums/selectors'

class InfiniteList extends Component {
  static propTypes = {
    albums: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalAlbums: PropTypes.number.isRequired,
    librarySectionId: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor () {
    super()

    this.isRowLoaded = this.isRowLoaded.bind(this)
    this.loadMoreRows = this.loadMoreRows.bind(this)
    this.rowRenderer = this.rowRenderer.bind(this)
  }

  componentWillMount () {
    this.loadMoreRows({startIndex: 0, stopIndex: 16})
  }

  isRowLoaded ({index}) {
    const {albums} = this.props
    return albums[index] != null
  }

  loadMoreRows ({startIndex, stopIndex}) {
    const {librarySectionId, dispatch} = this.props
    return dispatch(fetchLibraryAlbumsRange(librarySectionId, startIndex, stopIndex + 1))
  }

  rowRenderer ({index, key, style}) {
    const {albums} = this.props
    const album = albums[index]

    if (album == null) {
      return null
    }

    return (
      <div key={key} style={style}>
        <AlbumItem album={album} />
      </div>
    )
  }

  noRowsRenderer () {
    return (
      <div style={{color: '#fff'}}>
        <h2>...No albums to render?</h2>
      </div>
    )
  }

  render () {
    const {albums, totalAlbums} = this.props

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={totalAlbums}
      >
        {({onRowsRendered, registerChild}) => (
          <AutoSizer>
            {({height, width}) => (
              <List
                width={width}
                height={height}

                onRowsRendered={onRowsRendered}
                ref={registerChild}

                rowCount={albums.length}
                rowHeight={200}
                rowRenderer={this.rowRenderer}
                noRowsRenderer={this.noRowsRenderer}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    )
  }
}

export default connect((state, props) => {
  const {params} = props
  const {section} = params

  const allAlbums = getAllAlbums(state)

  return {
    albums: selectLibraryAlbums.values(state).map((id) => allAlbums.get(id)),
    totalAlbums: selectLibraryAlbums.total(state),
    librarySectionId: section ? parseInt(section, 10) : null,
  }
})(InfiniteList)
