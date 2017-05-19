import React from 'react'
import PropTypes from 'prop-types'
import {InfiniteLoader, AutoSizer, Table, Column} from 'react-virtualized'

const ROW_HEIGHT = 30

const TrackTable = (props) => {
  const {tracks, onLoad} = props

  return (
    <AutoSizer>
      {({width, height}) => (
        <InfiniteLoader
          isRowLoaded={({index}) => tracks[index] != null}
          loadMoreRows={({startIndex, stopIndex}) => onLoad(startIndex, stopIndex + 1)}
          rowCount={tracks.length}
        >
          {({onRowsRendered, registerChild}) => (
            <Table
              width={width}
              height={height}
              headerHeight={ROW_HEIGHT}
              rowCount={tracks.length}
              rowGetter={({index}) => tracks[index] || {}}
              rowHeight={() => ROW_HEIGHT}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
            >
              <Column
                dataKey='index'
                label='Index'
                cellDataGetter={({rowData}) => tracks.indexOf(rowData) + 1}
                width={50}
              />
              <Column
                dataKey='title'
                label='Title'
                width={200}
              />
              <Column
                label='Album'
                dataKey='parentTitle'
                width={200}
              />
              <Column
                label='Artist'
                dataKey='grandparentTitle'
                width={200}
              />
            </Table>
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
  )
}

TrackTable.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLoad: PropTypes.func,
}

export default TrackTable
