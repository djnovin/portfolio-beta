import { Analytics } from '@vercel/analytics/react'

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <main className=''>{children}</main>
                <Analytics />
            </body>
        </html>
    )
}

export default RootLayout
