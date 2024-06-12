'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
    return (
        <button
            className='bg-white border border-black border-solid text-black px-4 py-2 rounded-none hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50 transition-colors duration-300'
            onClick={() => signOut()}
            aria-label='Sign out'
            role='button'
        >
            Sign out
        </button>
    )
}
