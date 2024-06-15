'use client'

import React, { ComponentProps, useEffect, useState } from 'react'
import cn from 'classnames'
import { sendGTMEvent } from '@next/third-parties/google'

export interface ButtonProps {
    textString: string
}

export const SuccessIcon = () => (
    <span className='p-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out flex items-center gap-2'>
        <svg
            className='size-6'
            fill='none'
            stroke='currentColor'
            strokeWidth={1.5}
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
        >
            <path
                d='M5 13l4 4L19 7'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    </span>
)

export const CopyIcon = (props: ComponentProps<'button'>) => {
    const { className, ...rest } = props
    return (
        <button
            {...rest}
            className={cn(
                'p-4 cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out flex items-center gap-2',
                className
            )}
        >
            <svg
                className='size-6'
                fill='none'
                stroke='currentColor'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    d='M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>
        </button>
    )
}

export const CopyButton = ({
    className,
    textString,
    ...rest
}: ButtonProps & ComponentProps<'button'>) => {
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        isCopied === true ? setTimeout(() => setIsCopied(false), 50) : null
    }, [isCopied])

    const handleCopy = () => {
        navigator.clipboard
            .writeText(textString)
            .then(() => {
                setIsCopied(true)
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

    return isCopied ? (
        <SuccessIcon />
    ) : (
        <CopyIcon {...rest} className={className} onClick={handleCopy} />
    )
}
