import { configure } from '@storybook/react'
import 'babel-polyfill'

const req = require.context('../src/components', true, /\.story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
