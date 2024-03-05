import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'novin.noori.com',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7
        },
        {
            url: 'novin.noori.com/blog',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        }
    ]
}
