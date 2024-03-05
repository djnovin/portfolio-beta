import '@/styles/global.css'

import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/react'

const meta = {
    description:
        'Novin Noori is a software engineer and a full-stack developer.',
    title: 'Novin Noori',
    type: 'website',
    url: 'https://novinnoori.com'
}

const links: { href: string; label: string }[] = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/blog',
        label: 'Blog'
    }
]

const RootLayout = ({ children }: PropsWithChildren<{}>) => {
    return (
        <html lang='en'>
            <head>
                <title>Novin Noori</title>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <meta name='description' content={meta.description} />
                <meta property='og:url' content={meta.url} />
                <meta property='og:type' content={meta.type} />
                <meta property='og:title' content={meta.title} />
                <meta property='og:description' content={meta.description} />
            </head>
            <body>
                <nav className='flex justify-between items-center p-8'>
                    <ul>
                        {links.map(link => (
                            <li key={link.href} className='inline mr-4'>
                                {/** @ts-ignore */}
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                {children}
                <Analytics />
            </body>
        </html>
    )
}

export default RootLayout
