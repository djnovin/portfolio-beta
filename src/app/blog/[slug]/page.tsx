import React from 'react'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { BLOGS } from '@/constants/blog'
import { useMDXComponents } from '../../../mdx-components'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyButton } from '@/components/CopyButton'
import { Metadata, ResolvingMetadata } from 'next'
import { sendGTMEvent } from '@next/third-parties/google'

const getBlog = (slug: string) => {
    return BLOGS.find(blog => blog.slug === slug)
}

const RemoteMdxPage = ({ slug }: { slug: string }) => {
    const source = fs.readFileSync(
        path.join(process.cwd(), 'src/app/mdx', `${slug}.mdx`),
        'utf8'
    )

    const typographicRatios = {
        h1: 16 * 1.2 * 3,
        h2: 16 * 1.2 * 2,
        h3: 16 * 1.2 * 1,
        p: 16
    }

    return (
        /* @ts-ignore */
        <MDXRemote
            source={source}
            components={useMDXComponents({
                h1: ({ children }) => (
                    <h1
                        style={{
                            fontSize: typographicRatios.h1 + 'px',
                            lineHeight: typographicRatios.h1 * 1.2 + 'px',
                            margin: '20px 0'
                        }}
                        tabIndex={0}
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
                        tabIndex={0}
                    >
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3
                        style={{
                            fontSize: typographicRatios.h3 + 'px',
                            lineHeight: typographicRatios.h3 * 1.2 + 'px'
                        }}
                        tabIndex={0}
                    >
                        {children}
                    </h3>
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
                ),
                a: ({ children, href }) => (
                    <a
                        className='text-blue-500 hover:underline'
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={`Link to ${href}`}
                        onClick={() => {
                            sendGTMEvent({
                                event: 'click',
                                category: 'outbound',
                                label: href
                            })
                        }}
                    >
                        {children}
                    </a>
                ),
                strong: ({ children }) => (
                    <strong className='font-bold'>{children}</strong>
                ),
                ul: ({ children }) => (
                    <ul className='list-disc list-inside'>{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className='list-decimal'>{children}</ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                code: ({ className, children }) => {
                    const language =
                        className?.replace('language-', '') || 'typescript'
                    const codeString = Array.isArray(children)
                        ? children.join('')
                        : children

                    return (
                        <div className='relative my-10 border border-solid border-black'>
                            <div className='flex flex-row justify-between gap-4 space-x-4 items-center bg-gray-100'>
                                <div>
                                    <span className='pl-4'>{language}</span>
                                </div>
                                {codeString &&
                                    codeString.toString().length > 0 && (
                                        <CopyButton
                                            className=''
                                            textString={codeString?.toString()}
                                            aria-label='Copy code'
                                            onClick={() => {
                                                sendGTMEvent({
                                                    event: 'click',
                                                    category: 'copy',
                                                    label: 'code'
                                                })
                                            }}
                                        />
                                    )}
                            </div>
                            <div className='w-full border-t border-solid border-black'></div>
                            <SyntaxHighlighter
                                className='!my-0 !px-4 !bg-gray-50'
                                language={language}
                                style={solarizedlight}
                                wrapLines={true}
                                aria-label={`Code block in ${language}`}
                            >
                                {codeString?.toString() || ''}
                            </SyntaxHighlighter>
                        </div>
                    )
                }
            })}
        />
    )
}

type Props = {
    params: {
        slug: string
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const blog = getBlog(params.slug)

    return {
        applicationName: 'Novin Noori - Software Engineer Blog',
        authors: [{ name: 'Novin Noori' }],
        creator: 'Novin Noori',
        description: blog?.content.substring(0, 160) + ' ...',
        generator: 'Novin Noori - Software Engineer Blog',
        keywords: blog?.tags.join(', '),
        publisher: 'Novin Noori',
        title: blog?.title,
        openGraph: {
            description: blog?.content.substring(0, 160) + ' ...',
            title: blog?.title,
            type: 'article',
            url: `https://novinnoori.com/blog/${blog?.slug}`
        }
    }
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
                    aria-label='Breadcrumb navigation'
                />
            )}
            <RemoteMdxPage slug={params.slug} />
        </div>
    )
}
