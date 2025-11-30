// Build wrapper that loads polyfill before Next.js
require('./polyfill.js')
const { execSync } = require('child_process')

console.log('Loading File polyfill...')
execSync('next build', { stdio: 'inherit' })

