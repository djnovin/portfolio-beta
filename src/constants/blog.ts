import { Blogs } from '../types'

export const BLOGS: Blogs = [
    {
        id: 1,
        featured: true,
        image: '/images/2024-frontend-predictions.png',
        content:
            'I predict that in 2024, frontend development will be a lot easier than it is today.',
        date: '2024-01-01',
        slug: '2024-frontend-predictions',
        tags: ['frontend'],
        title: '2024 Frontend Predictions'
    },
    {
        id: 2,
        featured: true,
        image: '/images/using-rust-in-nextjs-api-routes.png',
        content:
            'Fetching data is easier than ever in Rust. Here is how you can do it.',
        date: '2024-06-11',
        slug: 'using-rust-in-nextjs-api-routes',
        tags: ['backend', 'rust', 'typescript', 'react', 'nextjs'],
        title: 'Using Rust in Next.js API Routes'
    },
    {
        id: 3,
        featured: true,
        image: '/images/zero-to-hero-with-actix-web.png',
        title: 'Zero to Hero with Actix Web',
        slug: 'zero-to-hero-with-actix-web',
        date: '2024-06-11',
        content:
            'Actix Web is a powerful web framework for Rust. Here is how you can get started with it.',
        tags: ['backend', 'rust']
    }
]
