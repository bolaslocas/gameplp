/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow static files from root
  async rewrites() {
    return [
      {
        source: '/game.js',
        destination: '/game.js',
      },
    ]
  },
}

export default nextConfig
