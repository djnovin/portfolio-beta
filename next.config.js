const withMDX = require('@next/mdx')()
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    compiler: {
        removeConsole: true
    },
    experimental: {
        typedRoutes: true,
        mdxRs: true
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    images: {
        formats: ['image/webp'],
        unoptimized: true
    }
}

module.exports = withMDX(nextConfig)
