import {createValueSelector} from '@stayradiated/mandarin'

const selectors = createValueSelector((state) => state.library.sections)

export const error = selectors.error
export const fetched = selectors.fetched
export const promise = selectors.promise
export const value = selectors.value
