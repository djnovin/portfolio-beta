/* eslint-disable import/no-default-export */
import React from 'react'
import Link from 'next/link'

import { BLOGS } from '@/constants/blog'
import { sortByDate } from '@/lib/index'
import { SubscribeForm } from '@/components/SubscribeForm'
import Footer from '@/components/Footer'

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
        <>
            <section
                className='h-full px-8 flex flex-col gap-y-4 max-w-6xl mx-auto mb-24 pt-10 md:pt-20'
                role='list'
            >
                <h1 className='text-2xl md:text-3xl font-bold mb-10'>
                    Featured
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 mb-12'>
                    {featuredBlogs.map(blog => (
                        <Link
                            className='flex flex-col md:justify-end gap-2 group w-full h-[320px] md:h-[480px] bg-black p-4 rounded-md'
                            href={`/blog/${blog.slug}`}
                            key={blog.id}
                        >
                            <article
                                aria-labelledby={`blog-title-${blog.id}`}
                                className=''
                                role='article'
                            >
                                <div className='flex flex-col gap-2 w-full'>
                                    <span
                                        className='group-hover:underline font-semibold text-xl text-white'
                                        id={`blog-title-${blog.id}`}
                                    >
                                        {blog.title}
                                    </span>
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
                                        {new Date(blog.date).toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            }
                                        )}
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                <h1 className='text-2xl md:text-3xl font-bold mb-4'>Latest</h1>
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
            </section>
            <SubscribeForm
                params={{
                    slug: '/'
                }}
            />
            <Footer />
        </>
    )
}

export default page
