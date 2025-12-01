// This file is loaded before Next.js starts via --require flag
// It ensures File polyfill is available for undici and other dependencies

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



