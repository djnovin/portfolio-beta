'use client'

import { deleteComment } from 'actions/deleteComment'
import { usePathname } from 'next/navigation'
import React, { ComponentProps } from 'react'

interface DeleteCommentButtonProps {
    id: string
    params: {
        slug: string
    }
}

export const DeleteCommentButton = (
    props: DeleteCommentButtonProps & ComponentProps<'button'>
) => {
    const { id, params } = props

    const pathName = usePathname()

    return (
        <button
            className='text-blue-500 bg-none border-none hover:underline focus:underline active:underline cursor-pointer font-light transition-all duration-200 ease-in-out p-0 m-0 text-xs'
            onClick={() => {
                deleteComment({
                    id: id,
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
