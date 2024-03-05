import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'novin.noori.com',
            lastModified: new Date()
        }
    ]
}
