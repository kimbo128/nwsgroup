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
  // Optimize build performance
  typescript: {
    // Skip type checking during build (faster, but less safe)
    // Type checking should be done in CI/CD separately
    ignoreBuildErrors: false, // Keep false for safety, but can be set to true for faster builds
  },
  eslint: {
    // Skip ESLint during build for faster builds
    // ESLint should be run separately in CI/CD
    ignoreDuringBuilds: true,
  },
  // Optimize output
  swcMinify: true,
  // Reduce build output
  compress: true,
}

module.exports = nextConfig

