'use client'

import React, { ComponentProps, useEffect } from 'react'
import cn from 'classnames'
import { AdBannerProps } from '@/types/index'

export const AdBanner = ({
    dataAdFormat,
    dataAdLayout,
    dataAdSlot,
    dataFullWidthResponsive,
    ...rest
}: AdBannerProps & ComponentProps<'ins'>) => {
    useEffect(
        () => (window.adsbygoogle = window.adsbygoogle || []).push({}),
        [dataAdFormat, dataAdLayout, dataAdSlot, dataFullWidthResponsive]
    )

    return (
        <ins
            {...rest}
            className={cn('adsbygoogle block')}
            data-ad-client='ca-pub-8952459697850931'
            data-ad-format={dataAdFormat}
            data-ad-layout={dataAdLayout}
            data-ad-slot={dataAdSlot}
            data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
    )
}
