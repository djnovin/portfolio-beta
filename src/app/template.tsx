'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'

export default function Template({
    children,
    loading
}: {
    readonly children: React.ReactNode
    readonly loading: boolean
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    const prevPathnameRef = useRef<string | null>(null)

    useEffect(() => {
        const isNavigatingFromHomeToBlog =
            prevPathnameRef.current === '/' && pathname.startsWith('/blog')

        const isNavigatingFromBlogToHome =
            pathname === '/' && prevPathnameRef.current?.startsWith('/blog')

        if (loading) {
            gsap.to(containerRef.current, {
                opacity: 0,
                x: isNavigatingFromHomeToBlog
                    ? 500
                    : isNavigatingFromBlogToHome
                    ? -500
                    : 0,
                duration: 0.5,
                ease: 'power3.inOut'
            })
        } else {
            gsap.fromTo(
                containerRef.current,
                {
                    opacity: 0,
                    x: isNavigatingFromHomeToBlog
                        ? -500
                        : isNavigatingFromBlogToHome
                        ? 500
                        : 0
                },
                { opacity: 1, x: 0, duration: 0.5, ease: 'power3.inOut' }
            )
        }

        prevPathnameRef.current = pathname
    }, [loading, pathname])

    return (
        <>
            <div ref={containerRef} style={{ height: '100%' }}>
                {children}
            </div>
        </>
    )
}
