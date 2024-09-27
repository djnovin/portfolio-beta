// components/ScrollToTopButton.js
'use client'

import { useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useGSAP(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <div>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className='w-12 h-12 flex z-[1000] rounded-full justify-center items-center text-white bg-black sticky right-8 bottom-8 cursor-pointer shadow-sm border-none hover:scale-105 transition-all duration-150'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18'
                        />
                    </svg>
                </button>
            )}
        </div>
    )
}
