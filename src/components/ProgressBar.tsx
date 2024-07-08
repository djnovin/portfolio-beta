'use client'

import React, { ComponentProps, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export const ProgressBar = ({ ...props }: ComponentProps<'div'>) => {
    const progressBarRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop

            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight

            const scroll = totalScroll / windowHeight

            gsap.to(progressBarRef.current, { width: `${scroll * 100}%` })
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [progressBarRef])

    return (
        <div
            className='left-0 top-0 w-full h-2 fixed bg-[#e0e0e0] z-50'
            {...props}
        >
            <div
                ref={progressBarRef}
                style={{
                    backgroundColor: '#d2fd78',
                    height: '100%',
                    width: '0%'
                }}
            />
        </div>
    )
}
