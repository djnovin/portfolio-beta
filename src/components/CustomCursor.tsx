'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { isMobileDevice } from 'helpers/device'

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const proximityThreshold = 20

    useEffect(() => {
        if (isMobileDevice()) return

        const handleMouseMove = (event: MouseEvent) => {
            const cursor = cursorRef.current
            if (!cursor) return

            const interactiveElements = document.querySelectorAll('a, button')
            let isMagnetActive = false

            interactiveElements.forEach(el => {
                const rect = el.getBoundingClientRect()
                const targetX = rect.left + rect.width / 2
                const targetY = rect.top + rect.height / 2
                const distance = Math.sqrt(
                    Math.pow(event.clientX - targetX, 2) +
                        Math.pow(event.clientY - targetY, 2)
                )

                if (distance < proximityThreshold) {
                    isMagnetActive = true
                    gsap.to(cursor, {
                        x: targetX,
                        y: targetY,
                        scale: 2,
                        duration: 0.3,
                        ease: 'power3.out'
                    })
                }
            })

            if (!isMagnetActive) {
                gsap.to(cursor, {
                    x: event.clientX,
                    y: event.clientY,
                    scale: 1,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.3)'
                })
            }
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    if (isMobileDevice()) {
        return null
    }

    return <div ref={cursorRef} className='custom-cursor' />
}

export default CustomCursor
