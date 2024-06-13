'use client'

import React from 'react'
import useMarkdownWithLatex from '@/hooks/useMarkdownWithLatex'
import { BlockMath, InlineMath } from 'react-katex'

import 'katex/dist/katex.min.css'

const renderLaTeX = (text: string) => {
    const inlineMathPattern = /\$(.+?)\$/g
    const blockMathPattern = /\$\$(.+?)\$\$/g

    // Render block LaTeX
    let renderedText = text.replace(blockMathPattern, (_, tex) => {
        return `<div class="katex-block"><BlockMath math={"${tex}"} /></div>`
    })

    // Render inline LaTeX
    renderedText = renderedText.replace(inlineMathPattern, (_, tex) => {
        return `<span class="katex-inline"><InlineMath math={"${tex}"} /></span>`
    })

    return renderedText
}

const createMarkup = (output: string) => {
    const latexProcessed = renderLaTeX(output)
    return { __html: latexProcessed }
}

const CommentInput: React.FC = () => {
    const { input, output, handleInputChange } = useMarkdownWithLatex()

    return (
        <div>
            <div dangerouslySetInnerHTML={createMarkup(output)} />
            <textarea
                className='border border-solid border-black p-4 rounded-none'
                value={input}
                onChange={handleInputChange}
                placeholder='Write your comment here (supports Markdown and LaTeX)'
                rows={10}
                cols={50}
                aria-label='Comment input'
            />
        </div>
    )
}

export default CommentInput
