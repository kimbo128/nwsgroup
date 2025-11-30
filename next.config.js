/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable instrumentation hook to load polyfills early
  experimental: {
    instrumentationHook: true,
    serverComponentsExternalPackages: ['cheerio'],
  },
}

module.exports = nextConfig

