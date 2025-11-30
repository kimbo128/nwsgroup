// Polyfill File for Node.js build environment
// This must be loaded before any other modules that might use File
if (typeof globalThis !== 'undefined' && typeof globalThis.File === 'undefined') {
  // Minimal File polyfill for build-time
  // @ts-ignore
  globalThis.File = class File {
    constructor(public fileBits: BlobPart[], public fileName: string, public options?: FilePropertyBag) {
      // Minimal File polyfill for build-time
    }
  } as any
}

// Also set it on global for Node.js compatibility
if (typeof global !== 'undefined' && typeof global.File === 'undefined') {
  // @ts-ignore
  global.File = globalThis.File
}

export {}

