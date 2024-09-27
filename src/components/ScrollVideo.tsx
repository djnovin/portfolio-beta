'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const ScrollVideo = () => {
    const containerRef = useRef(null)

    useGSAP(() => {
        const containerElement = containerRef.current

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerElement,
                start: 'top center',
                end: 'bottom top',
                scrub: true
            }
        })

        tl.fromTo(
            containerElement,
            {
                opacity: 0,
                scale: 0.8
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power3.out'
            }
        )
    }, [])

    return (
        <div>
            <div
                ref={containerRef}
                className='video-container w-full overflow-hidden rounded-lg'
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='w-full h-full object-cover object-center'
                >
                    <source src='/videos/video.mov' type='video/mp4' />
                </video>
            </div>
        </div>
    )
}

export default ScrollVideo
