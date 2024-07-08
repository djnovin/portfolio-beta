'use client'

import React, { ComponentProps, useEffect, useState } from 'react'
import cn from 'classnames'
import { sendGTMEvent } from '@next/third-parties/google'
import Copy from '@geist-ui/icons/copy'
import Check from '@geist-ui/icons/check'

export interface ButtonProps {
    textString: string
}

const styles = {
    button: 'm-2 p-2 cursor-pointer bg-gray-50 rounded-md hover:bg-gray-200 transition-colors duration-200 ease-in-out flex items-center gap-2 border border-gray-200',
    icon: 'size-4'
}

export const SuccessIcon = (props: ComponentProps<'span'>) => {
    const { className, ...rest } = props

    return (
        <span className={cn(styles.button, className)} {...rest}>
            <Check className={styles.icon} />
        </span>
    )
}

export const CopyIcon = (
    props: ComponentProps<'button'> & { clicked?: boolean }
) => {
    const { className, ...rest } = props
    return (
        <button {...rest} className={cn(styles.button, className)}>
            <Copy className={styles.icon} />
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
        isCopied === true ? setTimeout(() => setIsCopied(false), 1000) : null
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
        <SuccessIcon {...rest} className={className} />
    ) : (
        <CopyIcon {...rest} className={className} onClick={handleCopy} />
    )
}
