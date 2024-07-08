/* eslint-disable import/no-default-export */
import React from 'react'
import Link from 'next/link'

import { Tag } from '@/types/index'
import { Tags } from '@/components/Tags'
import { BLOGS } from '@/constants/blog'
import { sortByDate } from '@/lib/index'

export const metadata = {
    title: 'Blog | Novin Noori - Software Engineer',
    description:
        'Welcome to my blog where I share my thoughts and ideas on software engineering, full-stack development, and more.',
    keywords:
        'software engineer, software designer, rust, react, next.js, node.js, graphql, postgresql, redis, typescript, javascript, html, css, blog, vercel, aws, azure, gcp',
    openGraph: {
        title: 'Blog | Novin Noori - Software Engineer',
        description:
            'Welcome to my blog where I share my thoughts and ideas on software engineering, full-stack development, and more.',
        type: 'website',
        url: 'https://novinnoori.com/blog'
    }
}

const page = () => {
    const sortedBlogs = sortByDate([...BLOGS])
    const featuredBlogs = sortedBlogs.filter(blog => blog.featured)

    return (
        <div className='h-full px-8 flex flex-col gap-y-4' role='list'>
            <h1 className='text-2xl font-bold'>Featured</h1>
            {featuredBlogs.map(blog => (
                <Link
                    className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 group'
                    href={`/blog/${blog.slug}`}
                    key={blog.id}
                >
                    <article
                        aria-labelledby={`blog-title-${blog.id}`}
                        className='flex flex-col md:flex-row md:items-center gap-2'
                        role='article'
                    >
                        <div
                            aria-label='Tags'
                            className='flex flex-row gap-x-2'
                        >
                            {blog.tags &&
                                blog.tags.map(tag => (
                                    <Tags
                                        aria-label={`Tag: ${tag}`}
                                        key={`${blog.id}-${tag}`}
                                        tags={tag as Tag}
                                    />
                                ))}
                        </div>
                        <span
                            className='group-hover:underline font-semibold'
                            id={`blog-title-${blog.id}`}
                        >
                            {blog.title}
                        </span>
                    </article>
                    <span
                        className='text-gray-500 text-sm font-light'
                        aria-label={`Published on ${new Date(
                            blog.date
                        ).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}`}
                    >
                        {new Date(blog.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </Link>
            ))}
            <h1 className='text-2xl font-bold'>Latest</h1>
            {sortedBlogs.map(blog => (
                <Link
                    className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 group'
                    href={`/blog/${blog.slug}`}
                    key={blog.id}
                >
                    <article
                        aria-labelledby={`blog-title-${blog.id}`}
                        className='flex flex-col md:flex-row md:items-center gap-2'
                        role='article'
                    >
                        {/* <div
                            aria-label='Tags'
                            className='flex flex-row gap-x-2'
                        >
                            {blog.tags &&
                                blog.tags.map(tag => (
                                    <Tags
                                        aria-label={`Tag: ${tag}`}
                                        key={`${blog.id}-${tag}`}
                                        tags={tag as Tag}
                                    />
                                ))}
                        </div> */}
                        <span
                            className='group-hover:underline font-semibold'
                            id={`blog-title-${blog.id}`}
                        >
                            {blog.title}
                        </span>
                    </article>
                    <span
                        className='text-gray-500 text-sm font-light'
                        aria-label={`Published on ${new Date(
                            blog.date
                        ).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}`}
                    >
                        {new Date(blog.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default page
