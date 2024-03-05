import React, { lazy } from 'react'
import { blogs } from '@/constants/blog'
import Link from 'next/link'
import cn from 'classnames'
import { Category } from '@/components/Categories'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'

const getBlog = (slug: string) => {
    return blogs.find(blog => blog.slug === slug)
}

const getBlogByCategory = (category: string) => {
    return blogs.filter(blog => blog.category === category)
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

const RemoteMdxPage = ({ slug }: { slug: string }) => {
    const source = fs.readFileSync(
        path.join(process.cwd(), 'src/app/mdx', `${slug}.mdx`),
        'utf8'
    )

    return <MDXRemote source={source} />
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
            <RemoteMdxPage slug={params.slug} />
        </div>
    )
}
