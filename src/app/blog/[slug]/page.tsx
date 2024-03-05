import React from 'react'
import { blogs } from '@/constants/blog'
import Link from 'next/link'
import cn from 'classnames'
import { Category } from '@/components/Categories'

const getBlog = (slug: string) => {
    return blogs.find(blog => blog.slug === slug)
}

const Breadcrumbs = ({
    crumbs
}: {
    crumbs: { label: string; path: string }[]
}) => {
    return (
        <div>
            {crumbs.map((crumb, index) => (
                <span key={index}>
                    <Link
                        className={cn('hover:underline', {
                            underline: index >= crumbs.length - 1
                        })}
                        // @ts-ignore
                        href={crumb.path}
                    >
                        {crumb.label}
                    </Link>
                    {index < crumbs.length - 1 && <span> / </span>}
                </span>
            ))}
        </div>
    )
}

export default function page({ params }: { params: { slug: string } }) {
    const blog = getBlog(params.slug)

    return (
        <div className='px-8'>
            {blog && (
                <Breadcrumbs
                    crumbs={[
                        { label: 'Home', path: '/' },
                        { label: 'Blog', path: '/blog' },
                        { label: blog.title, path: `/blog/${blog.slug}` }
                    ]}
                />
            )}
            {blog && <h1>{blog.title}</h1>}
            {blog && <Category category={blog.category} />}
            {blog && <p>{blog.content}</p>}
        </div>
    )
}
