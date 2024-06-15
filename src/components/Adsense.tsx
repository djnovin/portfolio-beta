import Script, { ScriptProps } from 'next/script'

export interface AdsenseProps {
    pId: string
}

export const GoogleAdsense = ({ pId, ...rest }: AdsenseProps & ScriptProps) =>
    process.env.NODE_ENV !== 'production' &&
    process.env.ADSENSE_ENABLED === 'true' && (
        <Script
            {...rest}
            async
            crossOrigin='anonymous'
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
            strategy='afterInteractive'
        />
    )
