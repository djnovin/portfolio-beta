import React, { ComponentProps } from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from 'mdx-components'

import { CopyButton } from './CopyButton'
import { TYPOGRAPHIC_RATIOS } from '@/constants/typography'

export const H1 = (props: ComponentProps<'h1'>) => {
    const { children, ...rest } = props
    return (
        <h1
            {...rest}
            className='font-bold mb-5'
            style={{
                fontSize: TYPOGRAPHIC_RATIOS.h1 + 'px',
                lineHeight: TYPOGRAPHIC_RATIOS.h1 * 1.2 + 'px',
                margin: '20px 0'
            }}
            tabIndex={0}
        >
            {children}
        </h1>
    )
}

export const H2 = (props: ComponentProps<'h2'>) => {
    const { children, ...rest } = props
    return (
        <h2
            {...rest}
            className='mb-5 font-semibold'
            style={{
                fontSize: TYPOGRAPHIC_RATIOS.h2 + 'px',
                lineHeight: TYPOGRAPHIC_RATIOS.h2 * 1.2 + 'px',
                margin: '20px 0'
            }}
            tabIndex={0}
        >
            {children}
        </h2>
    )
}

export const H3 = (props: ComponentProps<'h3'>) => {
    const { children, ...rest } = props
    return (
        <h3
            {...rest}
            className='font-semibold mb-5'
            style={{
                fontSize: TYPOGRAPHIC_RATIOS.h3 + 'px',
                lineHeight: TYPOGRAPHIC_RATIOS.h3 * 1.2 + 'px'
            }}
            tabIndex={0}
        >
            {children}
        </h3>
    )
}

export const P = (props: ComponentProps<'p'>) => {
    const { children, ...rest } = props
    return (
        <p
            {...rest}
            style={{
                fontSize: TYPOGRAPHIC_RATIOS.p + 'px',
                lineHeight: TYPOGRAPHIC_RATIOS.p * 1.2 + 'px',
                margin: '20px 0'
            }}
        >
            {children}
        </p>
    )
}

export const A = (props: ComponentProps<'a'>) => {
    const { children, href, ...rest } = props
    return (
        <a
            {...rest}
            className='text-blue-500 hover:underline'
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Link to ${href}`}
        >
            {children}
        </a>
    )
}

export const Strong = (props: ComponentProps<'strong'>) => {
    const { children, ...rest } = props
    return <strong {...rest}>{children}</strong>
}

export const UL = (props: ComponentProps<'ul'>) => {
    const { children, ...rest } = props
    return <ul {...rest}>{children}</ul>
}

export const OL = (props: ComponentProps<'ol'>) => {
    const { children, ...rest } = props
    return <ol {...rest}>{children}</ol>
}

export const LI = (props: ComponentProps<'li'>) => {
    const { children, ...rest } = props
    return <li {...rest}>{children}</li>
}

export const Code = (
    props: ComponentProps<'code'> & { className?: string }
) => {
    const { className, children } = props

    const codeString = Array.isArray(children) ? children.join('') : children
    const language = className?.replace('language-', '') || 'text'

    return (
        <div className='relative my-10 border rounded-md overflow-clip shadow-sm group hover:cursor-text'>
            {codeString && codeString.toString().length > 0 && (
                <CopyButton
                    className='absolute top-0 right-0 group-hover:opacity-100 opacity-0 transition-all duration-200 ease-in-out'
                    aria-label='Copy code'
                    textString={codeString?.toString()}
                />
            )}
            <SyntaxHighlighter
                aria-label={`Code block in ${language}`}
                className='!my-0 !px-4 !bg-white !text-xs overflow-x-auto !font-mono'
                language={language}
                wrapLines={true}
            >
                {codeString?.toString() || ''}
            </SyntaxHighlighter>
        </div>
    )
}

export interface MDXPageProps {
    slug: string
}

export const RemoteMdxPage = (props: MDXPageProps) => {
    const { slug } = props

    const source = fs.readFileSync(
        path.join(process.cwd(), 'src/app/mdx', `${slug}.mdx`),
        'utf8'
    )
    return (
        <MDXRemote
            source={source}
            components={useMDXComponents({
                h1: H1,
                h2: H2,
                h3: H3,
                p: P,
                a: A,
                strong: Strong,
                ul: UL,
                ol: OL,
                li: LI,
                code: Code
            })}
        />
    )
}
