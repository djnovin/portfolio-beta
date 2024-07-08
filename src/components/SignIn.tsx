'use client'

import cn from 'classnames'
import { ComponentProps } from 'react'
import { signIn } from 'next-auth/react'

export const SignInButton = ({ ...props }: ComponentProps<'button'>) => (
    <button
        aria-label='Sign in'
        className={cn(
            'bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors duration-300',
            props.className
        )}
        onClick={() => signIn()}
        role='button'
        {...props}
    >
        Sign in
    </button>
)
