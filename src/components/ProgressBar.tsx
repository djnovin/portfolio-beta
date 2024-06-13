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
                backgroundColor: '#e0e0e0',
                height: '4px',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 100
            }}
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

export default ProgressBar
