/* eslint-disable import/no-default-export */
import React from 'react'
import Link from 'next/link'

import { BLOGS } from '@/constants/blog'
import { sortByDate } from '@/lib/index'
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

const Page = () => {
    const sortedBlogs = sortByDate([...BLOGS])
    const featuredBlogs = sortedBlogs.filter(blog => blog.featured)

    return (
        <>
            <section className='h-full flex flex-col'>
                <div className='w-full border-b border-gray-300'></div>
                <div className='px-8 py-6'>
                    <h1 className='text-2xl md:text-3xl font-light'>
                        Featured
                    </h1>
                </div>
                <div className='w-full border-b border-gray-300'></div>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    {featuredBlogs.map(blog => (
                        <Link
                            className='flex flex-col md:justify-end gap-2 group w-full h-[320px] md:h-[480px] bg-[#F4F3F1] p-4'
                            href={`/blog/${blog.slug}`}
                            key={blog.id}
                        >
                            <article
                                aria-labelledby={`blog-title-${blog.id}`}
                                className=''
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
                <div className='w-full border-b border-gray-300'></div>
                <div className='px-8 py-6'>
                    <h1 className='text-2xl md:text-3xl font-light'>Latest</h1>
                </div>
                <div className='w-full border-b border-gray-300'></div>
                <div className='flex flex-col gap-4 px-8 py-6'>
                    {sortedBlogs.map(blog => (
                        <Link
                            className='flex flex-col md:flex-row md:justify-between md:items-center gap-2 group'
                            href={`/${blog.slug}`}
                            key={blog.id}
                        >
                            <article
                                aria-labelledby={`blog-title-${blog.id}`}
                                className='flex flex-col md:flex-row md:items-center gap-2'
                            >
                                <span
                                    className='group-hover:underline font-light'
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
                                {new Date(blog.date).toLocaleDateString(
                                    'en-US',
                                    {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    }
                                )}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Page
