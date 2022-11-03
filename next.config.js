/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/webp'],
    domains: [
        "blogbucket.images.s3.ap-southeast-2.amazonaws.com"
    ],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-2.amazonaws.com',
        
      },
    ]
  }
}