import React, { lazy } from 'react'
import { blogs } from '@/constants/blog'
import Link from 'next/link'
import cn from 'classnames'
import { Category } from '@/components/Categories'
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'
import { useMDXComponents } from '../../../mdx-components'

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

    const typographicRatios = {
        h1: 16 * 1.75 * 3,
        h2: 16 * 1.75 * 2,
        h3: 16 * 1.75 * 1,
        p: 16
    }

    return (
        <MDXRemote
            source={source}
            components={
                useMDXComponents({
                    h1: ({ children }) => (
                        <h1
                            style={{
                                fontSize: typographicRatios.h1 + 'px',
                                lineHeight: typographicRatios.h1 * 1.2 + 'px',
                                margin: '20px 0'
                            }}
                        >
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2
                            style={{
                                fontSize: typographicRatios.h2 + 'px',
                                lineHeight: typographicRatios.h2 * 1.2 + 'px',
                                margin: '20px 0'
                            }}
                        >
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 style={{ fontSize: '25px' }}>{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p
                            style={{
                                fontSize: typographicRatios.p + 'px',
                                lineHeight: typographicRatios.p * 1.2 + 'px',
                                margin: '20px 0'
                            }}
                        >
                            {children}
                        </p>
                    )
                }) as any
            }
        />
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
            <RemoteMdxPage slug={params.slug} />
        </div>
    )
}
