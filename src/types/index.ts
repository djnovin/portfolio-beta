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

export type Tag =
    | 'frontend'
    | 'backend'
    | 'fullstack'
    | 'rust'
    | 'typescript'
    | 'react'
    | 'svelte'
    | 'vue'
    | 'angular'
    | 'postgres'
    | 'mysql'
    | 'mongodb'
    | 'nextjs'
    | 'express'
    | 'actix'
    | 'axum'

export type Tags = Tag[]

export type Blog = {
    content: string
    image: string
    date: string
    featured: boolean
    id: number
    slug: string
    tags: Tags
    title: string
}

export type Blogs = Blog[]

export type Comments = {
    id: string
    body: string
    blogSlug: string
    author: string
    authorId: string
    createdAt: string
    updatedAt: string
    parentId: string | null
    replies: Comments[]
}

export type Props = {
    params: {
        slug: string
    }
}

export type TypographyElement =
    | 'a'
    | 'blockquote'
    | 'code'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'li'
    | 'p'
    | 'pre'
    | 'strong'

export type TypographicRatios = Record<TypographyElement, number>

export type AdBannerProps = {
    dataAdFormat: string
    dataAdLayout: string
    dataAdSlot: string
    dataFullWidthResponsive: boolean
}
