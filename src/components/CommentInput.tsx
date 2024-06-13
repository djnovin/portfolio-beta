'use client'

import React, { useState, useCallback, ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export const CommentInput = (props: ComponentProps<'textarea'>) => {
    const { placeholder, ...rest } = props

    const [input, setInput] = useState<string>('')

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newValue = e.target.value
            setInput(newValue)
        },
        []
    )

    return (
        <>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >
                {input}
            </ReactMarkdown>
            <textarea
                {...rest}
                className='border border-solid border-black p-4 rounded-none'
                value={input}
                name='comment'
                onChange={handleInputChange}
                placeholder='Write your comment here (supports Markdown)'
                rows={10}
                cols={50}
                aria-label='Comment input'
            />
        </>
    )
}
