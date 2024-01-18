/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img.pokemondb.net',
        port: '',
        protocol: 'https'
      }
    ]
  },
  reactStrictMode: true
}

module.exports = nextConfig
