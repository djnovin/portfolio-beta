import { useState, useCallback } from 'react'
import marked from 'marked'
import DOMPurify from 'dompurify'

export const useMarkdownWithLatex = () => {
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<string>('')

    const handleInputChange = useCallback(
        async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value)
            const markdownOutput = await marked.parse(e.target.value)

            // Sanitize the output
            const sanitizedOutput = DOMPurify.sanitize(markdownOutput)
            setOutput(sanitizedOutput)
        },
        []
    )

    return { input, output, handleInputChange }
}
