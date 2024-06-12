'use client'

import { signIn } from 'next-auth/react'

export function SignInButton() {
    return (
        <button
            className='bg-black text-white px-4 py-2 rounded-none hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors duration-300'
            onClick={() => signIn()}
            aria-label='Sign in'
            role='button'
        >
            Sign in
        </button>
    )
}
