// This file is automatically loaded by Next.js before the application starts
// It ensures File polyfill is available for undici and other dependencies

if (typeof globalThis !== 'undefined' && typeof globalThis.File === 'undefined') {
  // Minimal File polyfill for Node.js build environment
  // This is needed because undici (used by Next.js fetch) requires File
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

export async function register() {
  // This function is called when the instrumentation is registered
  // File polyfill is already set above, so this is just for clarity
}



