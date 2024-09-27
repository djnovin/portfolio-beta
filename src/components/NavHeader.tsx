'use client'
import Link from 'next/link'
import React, { ComponentProps, useEffect, useState } from 'react'
import { SignInButton } from './SignIn'
import { SignOutButton } from './SignOut'
import { Session } from 'next-auth'
import cn from 'classnames'

const NavHeader = (
    props: ComponentProps<'nav'> & {
        isAuth: Session | null
        links: { href: string; label: string }[]
    }
) => {
    const { isAuth, links } = props

    const [isNavVisible, setIsNavVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY) {
                if (timer) {
                    clearTimeout(timer)
                }
                setTimer(
                    setTimeout(() => {
                        setIsNavVisible(false)
                    }) // Delay in milliseconds
                )
            } else {
                if (timer) {
                    clearTimeout(timer)
                }
                setIsNavVisible(true)
            }
            setLastScrollY(currentScrollY)
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (e.clientY < 50) {
                // Adjust the threshold as needed
                setIsNavVisible(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [lastScrollY, timer])

    return (
        <nav
            className={cn(
                'fixed w-full flex bg-[#F4F3F1] border-solid border-b justify-between items-center transition-all duration-500 z-[1000] h-[64px] border-gray-300',
                {
                    'transform-none border-solid border-b':
                        isNavVisible && lastScrollY > 0 && lastScrollY < 50,
                    'h-[32px] transform-none border-solid border-b':
                        isNavVisible && lastScrollY > 50,
                    '-translate-y-full': !isNavVisible
                }
            )}
            {...props}
        >
            <ul className='h-full flex flex-row justify-center items-center'>
                {links.map(link => (
                    <>
                        <li
                            key={link.href}
                            className='w-full h-full hover:bg-[#F4F3F1] min-w-[100px] flex justify-center items-center'
                        >
                            <Link href={link.href as Object}>{link.label}</Link>
                        </li>
                        <div className='w-full h-full border-r border-gray-300'></div>
                    </>
                ))}
            </ul>
            <div className='h-full w-full max-w-[300px]' role='navigation'>
                {isAuth ? <SignOutButton /> : <SignInButton />}
            </div>
        </nav>
    )
}

export default NavHeader
