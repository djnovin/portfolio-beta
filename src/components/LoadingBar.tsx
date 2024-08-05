// components/LoadingBar.tsx
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const LoadingBar = () => {
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 })
        tl.to(barRef.current, {
            width: '100%',
            duration: 2,
            ease: 'linear'
        }).to(barRef.current, { width: '0%', duration: 0 })
    }, [])

    return (
        <div className='loading-bar-container'>
            <div ref={barRef} className='loading-bar'></div>
            <style jsx>{`
                .loading-bar-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    z-index: 9999;
                }
                .loading-bar {
                    width: 0;
                    height: 100%;
                    background: #29d;
                }
            `}</style>
        </div>
    )
}

export default LoadingBar
