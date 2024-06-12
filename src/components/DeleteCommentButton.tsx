'use client'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import React, { ComponentProps } from 'react'

interface DeleteCommentButtonProps {
    comment: {
        id: string
    }
    prisma: PrismaClient
    params: {
        slug: string
    }
}

export const DeleteCommentButton = (
    props: DeleteCommentButtonProps & ComponentProps<'button'>
) => {
    const { comment, prisma, params } = props
    return (
        <button
            className='text-blue-500 bg-none border-none hover:underline focus:underline active:underline cursor-pointer font-light transition-all duration-200 ease-in-out p-0 m-0'
            onClick={() => {
                prisma.comment.delete({
                    where: {
                        id: comment.id
                    }
                })
                revalidatePath(`/blog/${params.slug}`)
            }}
        >
            Delete
        </button>
    )
}
