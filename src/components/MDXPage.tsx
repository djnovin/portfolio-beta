import React from 'react'

import SyntaxHighlighter from 'react-syntax-highlighter'
import fs from 'fs'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useMDXComponents } from 'mdx-components'

import { CopyButton } from './CopyButton'
import { TypographicRatios } from 'types'

export const RemoteMdxPage = ({
    slug,
    styles
}: {
    slug: string
    styles: TypographicRatios
}) => {
    const source = fs.readFileSync(
        path.join(process.cwd(), 'src/app/mdx', `${slug}.mdx`),
        'utf8'
    )

    return (
        /* @ts-ignore */
        <MDXRemote
            source={source}
            components={useMDXComponents({
                h1: ({ children }) => (
                    <h1
                        className='font-bold'
                        style={{
                            fontSize: styles.h1 + 'px',
                            lineHeight: styles.h1 * 1.2 + 'px',
                            margin: '20px 0'
                            // fontSize: typographicRatios.h1 + 'px',
                            // lineHeight: typographicRatios.h1 * 1.2 + 'px',
                            // margin: '20px 0'
                        }}
                        tabIndex={0}
                    >
                        {children}
                    </h1>
                ),
                h2: ({ children }) => (
                    <h2
                        className='font-medium'
                        style={{
                            fontSize: styles.h2 + 'px',
                            lineHeight: styles.h2 * 1.2 + 'px',
                            margin: '20px 0'
                        }}
                        tabIndex={0}
                    >
                        {children}
                    </h2>
                ),
                h3: ({ children }) => (
                    <h3
                        className='font-semibold'
                        style={{
                            fontSize: styles.h3 + 'px',
                            lineHeight: styles.h3 * 1.2 + 'px'
                        }}
                        tabIndex={0}
                    >
                        {children}
                    </h3>
                ),
                p: ({ children }) => (
                    <p
                        style={{
                            fontSize: styles.p + 'px',
                            lineHeight: styles.p * 1.2 + 'px',
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
