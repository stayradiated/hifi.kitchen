import {createSelector} from 'reselect'

export const root = (state) => state.timeline

export const currentTime = createSelector(
  root,
  (_root) => _root.currentTime,
)

export const playerState = createSelector(
  root,
  (_root) => _root.playerState,
)
