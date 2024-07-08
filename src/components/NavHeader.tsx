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

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY) {
                setIsNavVisible(false)
            } else {
                setIsNavVisible(true)
            }
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <nav
            className={cn(
                'fixed w-full flex bg-white justify-between items-center px-8 py-2 transition-all duration-500 z-[1000]',
                {
                    'border-none transform-none shadow-none': lastScrollY === 0,
                    'transform-none shadow-sm border-b border-gray-200':
                        isNavVisible,
                    '-translate-y-full': !isNavVisible
                }
            )}
            {...props}
        >
            <ul>
                {links.map(link => (
                    <li key={link.href} className='inline mr-4'>
                        <Link
                            href={{
                                pathname: link.href
                            }}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            {isAuth ? <SignOutButton /> : <SignInButton />}
        </nav>
    )
}

export default NavHeader
