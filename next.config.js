/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.dicebear.com',
      'image.tmdb.org'
    ],
    dangerouslyAllowSVG: true,
  },

}

module.exports = nextConfig
