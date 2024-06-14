'use client'

import React, { useEffect } from 'react'

type AdBannerProps = {
    dataAdSlot: string
    dataAdFormat: string
    dataAdLayout: string
    dataFullWidthResponsive: boolean
}

export const AdBanner = ({
    dataAdSlot,
    dataAdFormat,
    dataAdLayout,
    dataFullWidthResponsive
}: AdBannerProps) => {
    useEffect(() => {
        try {
            ;((window as any).adsbygoogle = window.adsbygoogle || []).push({})
        } catch (err) {
            console.error(err)
        }
    }, [])

    return (
        <ins
            className='adsbygoogle'
            data-ad-client='ca-pub-8952459697850931'
            data-ad-format={dataAdFormat}
            data-ad-layout={dataAdLayout}
            data-ad-slot={dataAdSlot}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
            style={{ display: 'block' }}
        />
    )
}
