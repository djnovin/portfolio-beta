/* eslint-disable import/no-default-export */
import '@/styles/global.css'

import NavHeader from '@/components/NavHeader'
import React, { PropsWithChildren } from 'react'
import Template from './template'
import { Analytics } from '@vercel/analytics/react'
import { GoogleAdsense } from '@/components/Adsense'
import { GoogleTagManager } from '@next/third-parties/google'
import { Links } from '@/types/index'
import { ReactLenis } from '@/lib/lenis'
import { auth } from 'auth'
import CustomCursor from '@/components/CustomCursor'

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
                <title>Novin Noori | Software Engineer</title>
                <meta charSet='utf-8' />
                <GoogleAdsense pId='8952459697850931' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </head>
            <body className='selection:bg-[#d2fd78] bg-[#E2E2E6] scroll-smooth'>
                <CustomCursor />
                <ReactLenis root>
                    <NavHeader isAuth={session} links={links} />
                    <Template loading={false}>
                        <div className='pt-20'>{children}</div>
                    </Template>
                </ReactLenis>
            </body>
            <Analytics />
        </html>
    )
}

export default RootLayout
