const withMDX = require('@next/mdx')()
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    experimental: {
        typedRoutes: true
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    mdxRs: true,
    images: {
        formats: ['image/webp'],
        unoptimized: true
    }
}

module.exports = withMDX(nextConfig)
