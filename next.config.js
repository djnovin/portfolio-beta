// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    experimental: {
        typedRoutes: true
    },
    images: {
        formats: ['image/webp'],
        unoptimized: true
    }
}

module.exports = nextConfig
