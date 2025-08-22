/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  // Para Next.js 15 com App Router
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig