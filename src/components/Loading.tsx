'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Template from '../app/template'

export default function ClientRootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const path = usePathname()
    const [loading, setLoading] = useState(false)
    // To stop the first page transitioning in, unless you want that, in which case remove this bit of logic
    const [isInitialLoading, setIsInitialLoading] = useState(true)

    useEffect(() => {
        // Bind react router navigation event to all a tags
        const onClick = (e: any) => {
            const target = e.target as HTMLElement

            var foundTarget = target

            if (
                target.tagName.toLowerCase() !== 'a' &&
                target.tagName.toLowerCase() !== 'button'
            ) {
                const closestAnchor = target.closest('a')
                if (closestAnchor) {
                    foundTarget = closestAnchor
                }
            }
            const lcTagName = foundTarget.tagName.toLowerCase()

            if (lcTagName === 'a' || lcTagName === 'button') {
                const href = foundTarget.getAttribute('href')
                if (href && href.startsWith('/')) {
                    e.preventDefault()
                    if (href !== path) {
                        setLoading(true)
                    }
                    router.push(href)
                }
            }
        }

        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [router, path])

    useEffect(() => {
        window.scrollTo(0, 0)
        setLoading(false)
        setIsInitialLoading(false)
    }, [path])

    return (
        <Template loading={!isInitialLoading && loading}>{children}</Template>
    )
}
