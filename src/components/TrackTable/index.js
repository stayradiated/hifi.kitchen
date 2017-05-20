import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {InfiniteLoader, AutoSizer, Table, Column} from 'react-virtualized'

import {TRACK} from '../../stores/constants'

import './styles.css'

import RatingBars from '../RatingBars'
import Time from '../Time'

const ROW_HEIGHT = 40

const TrackTable = (props) => {
  const {tracks, onLoad, onChange, onRate} = props

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
              headerClassName='TrackTable-headerColumn'
              rowCount={tracks.length}
              rowGetter={({index}) => tracks[index] || {}}
              rowHeight={ROW_HEIGHT}
              rowClassName={({index}) => (
                index < 0
                  ? 'TrackTable-headerRow'
                  : index % 2 === 0
                    ? 'TrackTable-row TrackTable-evenRow'
                    : 'TrackTable-row TrackTable-oddRow'
              )}
              onRowsRendered={onRowsRendered}
              onRowClick={({rowData}) => onChange(TRACK, rowData.id)}
              ref={registerChild}
            >
              <Column
                dataKey='title'
                label='Title'
                width={200}
              />
              <Column
                label='Album Artist'
                dataKey='grandparentTitle'
                width={200}
              />
              <Column
                label='Artist'
                dataKey='originalTitle'
                width={200}
              />
              <Column
                label='Album'
                dataKey='parentTitle'
                width={200}
              />
              <Column
                label='Rating'
                dataKey='userRating'
                width={100}
                cellRenderer={({rowData, cellData}) => (
                  <RatingBars
                    className='TrackTable-rating'
                    value={cellData}
                    maxValue={10}
                    onRate={(rating) => onRate(rowData.id, rating)}
                  />
                )}
              />
              <Column
                label='Duration'
                dataKey='duration'
                width={100}
                cellRenderer={({cellData}) => (
                  <Time value={cellData} />
                )}
              />
              <Column
                label='Plays'
                dataKey='viewCount'
                width={50}
              />
              <Column
                label='Date Added'
                dataKey='addedAt'
                width={150}
                cellRenderer={({cellData}) => (
                  cellData && moment(cellData * 1000).format('MMMM Do, YYYY')
                )}
              />
              <Column
                label='Bitrate'
                dataKey='bitrate'
                cellDataGetter={({rowData}) => rowData.media && rowData.media[0].bitrate}
                width={50}
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
  onLoad: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
}

export default TrackTable
