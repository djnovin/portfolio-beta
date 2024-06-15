'use client'

import React, { useState, useCallback, ComponentProps } from 'react'

export const CommentInput = ({ ...rest }: ComponentProps<'textarea'>) => {
    const [input, setInput] = useState<string>('')

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value)
        },
        []
    )

    return (
        <textarea
            {...rest}
            className='border border-solid border-black p-4 rounded-none w-full'
            name={rest.name !== undefined ? rest.name : 'comment'}
            onChange={handleInputChange}
            value={input}
            placeholder={
                rest.placeholder !== undefined
                    ? rest.placeholder
                    : 'Write your comment here (supports Markdown)'
            }
            aria-label='Comment input'
            cols={10}
            rows={10}
        />
    )
}
