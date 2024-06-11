type Categories = 'frontend' | 'backend' | 'fullstack'

export const blogs: {
    id: number
    title: string
    slug: string
    date: string
    content: string
    category: Categories
}[] = [
    {
        id: 1,
        title: '2024 Frontend Predictions',
        slug: '2024-frontend-predictions',
        date: '2024-01-01',
        content:
            'I predict that in 2024, frontend development will be a lot easier than it is today.',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'Using Rust in Next.js API Routes',
        slug: 'using-rust-in-nextjs-api-routes',
        date: '2024-01-02',
        content:
            'Fetching data is easier than ever in Rust. Here is how you can do it.',
        category: 'backend'
    }
]
