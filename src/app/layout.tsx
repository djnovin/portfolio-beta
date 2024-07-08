/* eslint-disable import/no-default-export */
import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAdsense } from '@/components/Adsense'
import { Links } from '@/types/index'
import { auth } from 'auth'
import NavHeader from '@/components/NavHeader'

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
                <NavHeader isAuth={session} links={links} />
                <div className='pt-20'>{children}</div>
            </body>
            <Analytics />
        </html>
    )
}

export default RootLayout
