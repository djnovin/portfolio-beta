import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Links, Meta } from '../types'

const links: Links = [
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
            <GoogleTagManager gtmId='GTM-MPDNBLXX' />
            <head>
                <title>Novin Noori</title>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
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
                <div className='max-w-4xl container mx-auto'>{children}</div>
                <Analytics />
            </body>
        </html>
    )
}

export default RootLayout
