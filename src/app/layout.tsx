/* eslint-disable import/no-default-export */
import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAdsense } from '@/components/Adsense'
import { Links } from '@/types/index'
import { SignInButton } from '@/components/SignIn'
import { SignOutButton } from '@/components/SignOut'
import { auth } from 'auth'

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
                <GoogleAdsense pId='8952459697850931' />
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
                                <Link
                                    href={{
                                        pathname: link.href
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {session ? <SignOutButton /> : <SignInButton />}
                </nav>
                <div className='max-w-4xl container mx-auto'>{children}</div>
            </body>
            <Analytics />
        </html>
    )
}

export default RootLayout
