import Script from 'next/script'

export type Props = {
    pId: string
}

export const GoogleAdsense: React.FC<Props> = ({ pId }) => {
    if (process.env.NODE_ENV !== 'production') {
        return null
    }
    return (
        <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
            crossOrigin='anonymous'
            strategy='afterInteractive'
        />
    )
}
