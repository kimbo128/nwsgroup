// Global type definitions for Node.js environment
// This ensures File is available during build time

declare global {
  // File API is available in Node.js 18+ and Next.js runtime
  interface File extends Blob {
    readonly name: string
    readonly lastModified: number
    readonly webkitRelativePath: string
  }

  var File: {
    prototype: File
    new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File
  }
}

export {}



