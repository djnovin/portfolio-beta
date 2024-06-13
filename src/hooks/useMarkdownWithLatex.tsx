import { useState, useCallback } from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

const useMarkdownWithLatex = () => {
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<string>('')

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value)
            const markdownOutput = marked(e.target.value)
            const sanitizedOutput = DOMPurify.sanitize(markdownOutput)
            setOutput(sanitizedOutput)
        },
        []
    )

    return { input, output, handleInputChange }
}

export default useMarkdownWithLatex
