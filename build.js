// Build wrapper that loads polyfill before Next.js
// IMPORTANT: This must be executed BEFORE any Next.js modules are loaded

// Load File polyfill FIRST, before anything else
if (typeof globalThis !== 'undefined' && typeof globalThis.File === 'undefined') {
  // Minimal File polyfill for Node.js build environment
  // This is needed because undici (used by Next.js fetch) requires File
  globalThis.File = class File {
    constructor(fileBits, fileName, options) {
      this.fileBits = fileBits
      this.fileName = fileName
      this.options = options
    }
  }
}

// Also set it on global for Node.js compatibility
if (typeof global !== 'undefined' && typeof global.File === 'undefined') {
  global.File = globalThis.File
}

console.log('File polyfill loaded before Next.js...')

const { execSync } = require('child_process')

// Execute Next.js build with NODE_OPTIONS to ensure polyfill is loaded in child process
const env = { ...process.env }
env.NODE_OPTIONS = (env.NODE_OPTIONS || '') + ' --require ./polyfill.js'

execSync('next build', { stdio: 'inherit', env })

