'use client'

import React, { useEffect } from 'react'

type AdBannerProps = {
    dataAdSlot: string
    dataAdFormat: string
    dataFullWidthResponsive: boolean
}

export const AdBanner = ({
    dataAdSlot,
    dataAdFormat,
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
            style={{ display: 'block' }}
            data-ad-client='ca-pub-8952459697850931'
            data-ad-slot={dataAdSlot}
            data-ad-format={dataAdFormat}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
        ></ins>
    )
}
