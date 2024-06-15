'use client'

import cn from 'classnames'
import { ComponentProps } from 'react'
import { signOut } from 'next-auth/react'

export const SignOutButton = ({ ...props }: ComponentProps<'button'>) => (
    <button
        aria-label='Sign out'
        className={cn(
            'bg-white border border-black border-solid text-black px-4 py-2 rounded-none hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors duration-300',
            props.className
        )}
        onClick={() => signOut()}
        role='button'
        {...props}
    >
        Sign out
    </button>
)
