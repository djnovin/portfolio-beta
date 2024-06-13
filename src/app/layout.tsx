import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Links, Meta } from '../types'
import { SignInButton } from '@/components/SignIn'
import { auth } from 'auth'
import { SignOutButton } from '@/components/SignOut'

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

const RootLayout = async ({ children }: PropsWithChildren<{}>) => {
    const session = await auth()

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
            <body className='selection:bg-[#d2fd78] scroll-smooth'>
                <nav className='flex justify-between items-center p-8'>
                    <ul>
                        {links.map(link => (
                            <li key={link.href} className='inline mr-4'>
                                {/** @ts-ignore */}
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                    {session ? <SignOutButton /> : <SignInButton />}
                </nav>
                <div className='max-w-4xl container mx-auto'>{children}</div>
                <Analytics />
            </body>
        </html>
    )
}

export default RootLayout
