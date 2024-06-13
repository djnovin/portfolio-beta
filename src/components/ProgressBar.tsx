'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const ProgressBar = () => {
    const progressBarRef = useRef(null)

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
            style={{
                position: 'fixed',
                zIndex: 100,
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                backgroundColor: '#e0e0e0'
            }}
        >
            <div
                ref={progressBarRef}
                style={{
                    height: '100%',
                    backgroundColor: '#3b82f6',
                    width: '0%'
                }}
            />
        </div>
    )
}

export default ProgressBar
