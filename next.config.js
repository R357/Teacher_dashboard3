/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    serverActions: true,
    typedRoutes: true
  }
}

module.exports = nextConfig
