export type Link = {
    href: string
    label: string
}

export type Links = Link[]

export type Meta = {
    description: string
    title: string
    type: string
    url: string
}

export type Categories = 'frontend' | 'backend' | 'fullstack'

export type Blog = {
    id: number
    title: string
    slug: string
    date: string
    content: string
    category: Categories
}

export type Blogs = Blog[]
