/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: false,
  // Adicione se estiver usando app router
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig