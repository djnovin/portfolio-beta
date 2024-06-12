'use client'

import { deleteComment } from 'actions/deleteComment'
import { usePathname } from 'next/navigation'
import React, { ComponentProps } from 'react'

interface DeleteCommentButtonProps {
    comment: {
        id: string
    }
    params: {
        slug: string
    }
}

export const DeleteCommentButton = (
    props: DeleteCommentButtonProps & ComponentProps<'button'>
) => {
    const { comment, params } = props

    const pathName = usePathname()

    return (
        <button
            className='text-blue-500 bg-none border-none hover:underline focus:underline active:underline cursor-pointer font-light transition-all duration-200 ease-in-out p-0 m-0'
            onClick={() => {
                deleteComment({
                    comment,
                    params,
                    inViewRoute:
                        pathName === `/blog/${params.slug}` ? true : false
                })
            }}
        >
            Delete
        </button>
    )
}
