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
    id: number
    title: string
    slug: string
    date: string
    content: string
    tags: Tags
}

export type Blogs = Blog[]
