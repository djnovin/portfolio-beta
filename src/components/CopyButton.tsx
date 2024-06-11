'use client'

import React, { ComponentProps } from 'react'
import cn from 'classnames'
import { sendGTMEvent } from '@next/third-parties/google'

export interface ButtonProps {
    textString: string
}
export const CopyButton = ({
    textString,
    className
}: ButtonProps & ComponentProps<'button'>) => {
    const [isCopied, setIsCopied] = React.useState(false)

    React.useEffect(() => {
        if (isCopied) {
            const timeout = setTimeout(() => {
                setIsCopied(false)
            }, 1000)

            return () => clearTimeout(timeout)
        }
    }, [isCopied])

    const handleCopy = () => {
        navigator.clipboard
            .writeText(textString)
            .then(() => {
                setIsCopied(true)
            })
            .catch(err => {
                console.error('Failed to copy text: ', err)
            })
            .finally(() => {
                sendGTMEvent({
                    action: 'click',
                    category: 'button',
                    event: 'copy',
                    label: 'Copy Button',
                    text: textString,
                    url: window.location.href
                })
            })
    }

    switch (isCopied) {
        case true:
            return (
                <span className='p-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out flex items-center gap-2'>
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
                            d='M5 13l4 4L19 7'
                        />
                    </svg>
                </span>
            )
        case false:
            return (
                <button
                    onClick={handleCopy}
                    className={cn(
                        'p-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out flex items-center gap-2',
                        className
                    )}
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
                            d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
                        />
                    </svg>
                </button>
            )
    }
}
